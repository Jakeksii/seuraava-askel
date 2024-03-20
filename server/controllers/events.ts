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

type Preferences = {
  age_group: string[]
  language: string[]
  denomination: string[]
  category: string[]
  date_origin: Date
}
export const getEvents = async (req: Request, res: Response) => {
  try {
    /* DECLARING VARIABLES */
    const search = req.query.s as string
    const latitude = parseFloat(req.query.lat as string) || 0
    const longitude = parseFloat(req.query.lon as string) || 0
    const preferences = req.body.preferences as Preferences

    // PAGINATE
    const page = parseInt(req.query.p as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 3; // Number of items per page
    const skip = (page - 1) * limit

    /* SEARCH CONFIGURATION */

    // filter expired events
    const dateFilter = {
      range: {
        path: 'end_date',
        gt: new Date()
      }
    }

    // filter by max distance
    const locationFilter = (latitude && longitude) ? {
      geoWithin: {
        path: "location",
        circle: {
          center: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          radius: 100000
        },
      }
    } : undefined

    const dateSearch = { // in week
      near: {
        path: 'start_date',
        origin: new Date(preferences.date_origin), // this date
        pivot: 86450679 * 7, // day in ms *7 = week
      }
    }

    // confif for text based search
    const textSearch = (search) ? {
      text: {
        query: search,
        path: {
          wildcard: "*" // search from every field
        },
        fuzzy: {
          maxEdits: 2,
          prefixLength: 2
        }
      }
    } : undefined

    // config for location based search
    const locationSearch = (latitude && longitude) ? {
      near: {
        origin: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        pivot: 10000, // mitä pienempi pivotti sitä vähemmän sijainnin läheisyydellä on väliä
        path: "location",
        score: { boost: { value: 1.5 } } // pivot / (pivot + abs(distance)) 50km
      }
    } : undefined

    // testaa equals
    // mapataan like componentti jokasesta categoriasta
    // config for preferences
    const test = preferences.category.map((cat) => ({'meta.types': cat}))
    const preferencesSearch = preferences ? {
      moreLikeThis: {
        like: {
            'meta.denomination': preferences.denomination,
            'meta.language': preferences.language,
            'meta.category': preferences.category,
          },
        //score: { boost: { value: 0.8 } }
      }
    } : undefined


    /* SEARCH CONSTRUCTION */
    let compound = {} as any

    // construct compound.should clause
    let should = []
    should.push(dateSearch) // always use date search default value 1 week
    locationSearch && should.push(locationSearch) // if location available allways use it
    preferencesSearch && should.push(preferencesSearch)

    // construct filter clause
    let filter = []
    filter.push(dateFilter)
    locationFilter && filter.push(locationFilter)

    if (search) {
      compound.must = textSearch // if search is given put it in must clause
    }

    compound.filter = filter
    compound.should = should

    // construct pipeline
    const pipeline = [{
      $search: {
        index: "search",
        compound: compound
      }
    }]

    /* SEARCH AND RESPONSE */

    // fetch events from DB
    let events: IEvent[]
    events = await Event.aggregate(pipeline).skip(skip).limit(limit).exec()

    const data = events.map((event) => {
      return {
        _id: event._id,
        start_date: event.start_date,
        end_date: event.end_date,
        title: event.title,
        extract: event.extract,
        address: event.address,
        location: event.location,
        image_id: event.image_id,
        meta: event.meta,
        organization: event.organization,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
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
      location: event.location,
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