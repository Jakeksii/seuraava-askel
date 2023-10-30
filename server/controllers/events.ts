import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { Types } from 'mongoose'
import { Event } from "../connections/MainConnection"
import { Filters, IEvent, Request, Response } from '../types'

// USE ZOD VALIDATOR

export const createEvent = async (req: Request, res: Response) => {

  // Validate image
  if (!req.file) return res.status(400).end()
  const image = req.file.buffer

  // Validate user access to organization
  // Find organization by id from requesting user data
  // And test if user role is owner, admin or user in that organization
  const organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.body.organization_id))
  if (!organization ||
    (organization.role !== "owner" &&
      organization.role !== "admin" &&
      organization.role !== "user")) {
    //deleteImageFile(imagePath)
    return res.status(403).end();
  }

  // VALIDATE event
  const event = JSON.parse(req.body.event)

  // Create event object
  const newEvent = new Event({
    start_date: event.start_date,
    end_date: event.end_date,
    title: event.title,
    extract: event.extract,
    description: event?.description,
    visible: event.visible,
    address: event.address,
    image_id: "", // Set after the image is uploaded to cloudinary
    meta: event?.meta,
    organization: {
      organization_id: organization.organization_id,
      organization_name: organization.organization_name
    },
    created_by: req.user._id,
    updated_by: req.user._id
  })

  // validate event object
  const validationError = newEvent.validateSync();
  if (validationError) {
    //deleteImageFile(imagePath)
    return res.status(400).json({ message: validationError.message });
  }

  // Upload the image to cloudinary
  cloudinary.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image)

  async function uploadDone(error: any, result: UploadApiResponse | undefined) {
    if (error) {
      console.log("Error in cloudinary.uploader.upload_stream\n", error);
      return res.status(500).json({ error: error });
    }
    // Pass url to newEvent
    newEvent.image_id = result?.public_id

    try {
      // save created event to db
      const savedEvent = await newEvent.save()
      // return saved event to client
      return res.status(201).json(savedEvent)
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}


export const getFilters = async (req: Request, res: Response) => {
  try {
    // DESTRUCTURE REQUEST BODY ---------------------
    const location = req.body.location as { latitude: number, longitude: number }
    const matchQuery = constructMatchQuery(req.body.filters)
    if (!matchQuery) return res.status(400).json({ error: "Invalid Filters object" })

    // CONSTRUCT PIPELINE ----------------
    const pipeline = [];

    // With geo matching
    if (location) {
      const { latitude, longitude } = location;
      pipeline.push({
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [longitude, latitude] as [number, number],
          },
          distanceField: 'distance',
          spherical: true
        } as const
      });
    }

    // Common pipeline stages
    pipeline.push(
      {
        $match: matchQuery
      },
      {
        $facet: {
          denomination: [
            { $group: { _id: '$meta.denomination' } },
            { $project: { _id: 0, value: '$_id' } },
          ],
          types: [
            {
              $unwind: '$meta.types'
            },
            { $group: { _id: '$meta.types' } },
            { $project: { _id: 0, value: '$_id' } },
          ],
          size: [
            { $group: { _id: '$meta.size' } },
            { $project: { _id: 0, value: '$_id' } },
          ],
          language: [
            {
              $unwind: '$meta.language'
            },
            { $group: { _id: '$meta.language' } },
            { $project: { _id: 0, value: '$_id' } },
          ]
        }
      }
    );

    // FETCH FILTERS ---------------------------------
    const availableFilters = await Event.aggregate(pipeline).exec();

    // SEND FORMATTED EVENTS ---------------------------
    return res.status(200).json(availableFilters[0]);

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred while fetching filters' })
  }
}




export const getEvents = async (req: Request, res: Response) => {
  try {
    // DESTRUCTURE REQUEST BODY ---------------------
    const location = req.body.location as { latitude: number, longitude: number }
    const search = req.body.search as [
      { "address.city": string },
      { "organization.organization_name": string },
      { "title": string }
    ]
    const matchQuery = constructMatchQuery(req.body.filters)
    if (!matchQuery) return res.status(400).json({ error: "Invalid Filters object" })

    // QUERY ----------------------------------------
    const searchQuery = {
      $and: [
        matchQuery,
        {
          $or: search
        }
      ]
    };

    // PAGINATE ----------------------------------
    const page = parseInt(req.query.page as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 3; // Number of items per page
    const skip = (page - 1) * limit

    // FETCH EVENTS ---------------------------------
    let events: IEvent[]
    if (location) {
      const { latitude, longitude } = location
      events = await Event.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            distanceField: 'distance',
            spherical: true
          },
        },
        {
          $match: matchQuery
        },
        {
          $sort: {
            distance: 1,  // Sort by distance in ascending order (closest first)
            start_date: 1, // Then sort by start_date in ascending order
          },
        },
        // Additional stages if needed
      ]).skip(skip).limit(limit).exec();
    } else {
      events = await Event.find(searchQuery).skip(skip).limit(limit).sort({ start_date: 1 }).exec()
    }

    // FORMAT EVENTS ------------------------------------
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
        updatedAt: event.updatedAt
      }
    })

    // SEND FORMATTED EVENTS ---------------------------
    return res.status(200).json(data)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'An error occurred while fetching events' })
  }
}

export const searchEvents = async (req: Request, res: Response) => {
  const search = req.query.s as string;
  const searchTerm = search.toLowerCase();
  if (searchTerm.length < 3) return res.status(400).json({ message: "search term needs to be atleast 3 char long" })

  const regex = { $regex: searchTerm, $options: 'i' };
  const endDateFilter = { end_date: { $gte: new Date() } }
  const cityFilter = { 'address.city': regex }
  const organizationFilter = { 'organization.organization_name': regex }
  const titleFilter = { title: regex }
  try {
    const [distinctCities, distinctOrgNames, distinctTitles] = await Promise.all([
      Event.find({ $and: [cityFilter, endDateFilter] }).distinct('address.city').exec(),
      Event.find({ $and: [organizationFilter, endDateFilter] }).distinct('organization.organization_name').exec(),
      Event.find({ $and: [titleFilter, endDateFilter] }).distinct('title').exec(),
    ]);
    const cities = distinctCities.map((data) => ({ type: 'city', data: data }))
    const organizations = distinctOrgNames.map((data) => ({ type: 'organization', data: data }))
    const titles = distinctTitles.map((data) => ({ type: 'title', data: data }))

    const results = [...cities, ...organizations, ...titles]

    return res.status(200).json(results);

  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ error: 'An error occurred while fetching events' });
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

function constructMatchQuery(filters: Filters) {
  try {
    const meta = filters.meta
    return {
      $and: [
        meta.denomination && meta.denomination.length > 0 ? { 'meta.denomination': { $in: meta.denomination } } : {},
        meta.types && meta.types.length > 0 ? { 'meta.types': { $in: meta.types } } : {},
        meta.size && meta.size.length > 0 ? { 'meta.size': { $in: meta.size } } : {},
        meta.language && meta.language.length > 0 ? { 'meta.language': { $in: meta.language } } : {},
      ]
    }
  } catch (error) {
    console.error("Error when creating filters", error)
    return undefined
  }
}