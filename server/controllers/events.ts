import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { Types } from 'mongoose'
import { Event } from "../connections/MainConnection"
import { IEvent, Request, Response } from '../types'

export const createEvent = async (req: Request, res: Response) => {
  try {

    // Check if we have image
    if (!req.file) return res.status(400).end()
    const image = req.file.buffer

    // Get organization
    // We know that user access role to this organization is atleast 'user', because we have middleware that prevents code reaching here if no.
    const organization = req.organization

    // Create event
    const event = new Event({
      ...JSON.parse(req.body.event), // event data that client sended. Any data that is not in IEvent will be discarded.
      image_id: "", // Set after the image is uploaded to cloudinary
      organization: {
        organization_id: organization._id,
        organization_name: organization.organization_name
      },
      created_by: req.user._id,
      updated_by: req.user._id
    })

    // Validate event
    const validationError = await event.validateSync();
    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    // Upload the image to cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image)
    async function uploadDone(error: any, result: UploadApiResponse | undefined) {
      if (error) {
        console.error("Error in cloudinary.uploader.upload_stream\n", error);
        return res.status(500).json({ error: "Internal Server Error when uploading image" });
      }
      // Pass url to newly created event
      event.image_id = result?.public_id

      // save created event to db
      const savedEvent = await event.save()

      // return saved event to client
      return res.status(201).json({ saved_event: savedEvent })
    }

  } catch (error) {
    console.error(error)
    return res.status(500).end();
  }
}

export const getFilters = async (req: Request, res: Response) => {
  const filters = req.body.filters

  const availableFilters = await Event.aggregate([
    {
      $match: filters, // Apply your initial filters
    },
    {
      $facet: {
        denomination: [
          { $group: { _id: '$meta.denomination' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        types: [
          {
            $unwind: '$meta.types' // Split the array into individual documents
          },
          { $group: { _id: '$meta.types' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        size: [
          { $group: { _id: '$meta.size' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        language: [
          { $group: { _id: '$meta.language' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        price: [
          { $group: { _id: '$meta.price' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
        online: [
          { $group: { _id: '$meta.online' } },
          { $project: { _id: 0, value: '$_id' } },
        ],
      },
    },
  ]).exec();

  return res.status(200).json(availableFilters[0])
}

const getRecommendedEvents = async (req: Request) => {
  // PAGINATE
  const page = parseInt(req.query.p as string) || 1; // Current page number
  const limit = parseInt(req.query.limit as string) || 3; // Number of items per page
  const skip = (page - 1) * limit

  // confif for recommendations
  const recommendationSearch = {
    text: {
      query: "Jyväskylä",
      path: {
        wildcard: "*"
      },
      fuzzy: {
        maxEdits: 2,
        prefixLength: 2
      }
    }
  }


  const pipeline = [{
    $search: {
      index: "search",
      compound: {
        should: [
          recommendationSearch
        ]
      }
    }
  }]

  const events = await Event.aggregate(pipeline).skip(skip).limit(limit).exec()
  return events
}

export const getEvents = async (req: Request, res: Response) => {
  try {

    const location = req.body.location as { longitude: number, latitude: number }
    const search = req.query.s as string
    const filters = req.body.filters ?? {}
    const sort = req.body.sort

    // PAGINATE
    const page = parseInt(req.query.p as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 3; // Number of items per page
    const skip = (page - 1) * limit

    // confif for text based search
    const textSearch = {
      text: {
        query: search,
        path: {
          wildcard: "*"
        },
        fuzzy: {
          maxEdits: 2,
          prefixLength: 2
        }
      }
    }

    // config for location based search
    const locationSearch = {
      near: {
        origin: {
          type: "Point",
          coordinates: [location?.longitude, location?.latitude]
        }, // pivot / (pivot + abs(fieldValue - origin))
        pivot: 10000000000000000,
        path: "location",
        score: { boost: { value: 200 } }
      }
    }

    // THIS IS SO NICE
    // config for preferences
    const preferencesSearch = {
      moreLikeThis: {
        like: [{
          'meta.denomination': ['Free church'],
          'meta.types': ['Seniors', 'Youth'],
        }]
      }
    }

    let compound = {} as any
    // if (search) compound.should = {
    //   ...textSearch
    // }
    if (location) compound.should = {
      ...locationSearch
    }
    compound.should = {
      ...preferencesSearch
    }


    const pipeline = [{
      $search: {
        index: "search",
        compound: compound
      }
    }]

    // "compound.should" only one of [autocomplete, compound, embeddedDocument, equals, exists, geoShape, geoWithin, in, knnBeta, moreLikeThis, near, phrase, queryString, range, regex, search, span, term, text, wildcard] may be present

    let events: IEvent[]
    events = await Event.aggregate(pipeline).skip(skip).limit(limit).exec()
    let recommended = false
    // if (!location && !search) {
    //   events = await getRecommendedEvents(req)
    //   recommended = true
    // } else {
    //   events = await Event.aggregate(pipeline).skip(skip).limit(limit).exec()
    // }

    // // Jos tapahtumat lista on tyhjä haetaan tapahtumia recommended functiolla
    // if (events.length === 0) {
    //   events = await getRecommendedEvents(req)
    //   recommended = true
    // }

    const data = events.map((event: IEvent) => {
      return {
        _id: event._id,
        start_date: event.start_date,
        end_date: event.end_date,
        title: event.title,
        extract: event.extract,
        address: event.address,
        image_id: event.image_id,
        meta: event.meta,
        organization: event.organization,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        recommended: recommended
      }
    })

    return res.status(200).json(data)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred while fetching events' })
  }
}

// Event page
export const getEventPage = async (req: Request, res: Response) => {
  const { _id } = req.params
  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const event: IEvent | null = await Event.findById(_id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const data = {
      _id: event._id,
      start_date: event.start_date,
      end_date: event.end_date,
      title: event.title,
      extract: event.extract,
      description: event.description,
      address: event.address,
      image_id: event.image_id,
      meta: event.meta,
      organization: event.organization,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}