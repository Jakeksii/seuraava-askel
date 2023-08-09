"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = exports.searchEvents = exports.getEvents = exports.createEvent = void 0;
const cloudinary_1 = require("cloudinary");
const MainConnection_1 = require("../connections/MainConnection");
const mongoose_1 = require("mongoose");
// USE ZOD VALIDATOR
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate image
    if (!req.file)
        return res.status(400).end();
    const image = req.file.buffer;
    // Validate user access to organization
    // Find organization by id from requesting user data
    // And test if user role is owner, admin or user in that organization
    const organization = req.user.organizations.find((organization) => organization.organization_id.equals(req.body.organization_id));
    if (!organization ||
        (organization.role !== "owner" &&
            organization.role !== "admin" &&
            organization.role !== "user")) {
        //deleteImageFile(imagePath)
        return res.status(403).end();
    }
    // VALIDATE event
    const event = JSON.parse(req.body.event);
    // Create event object
    const newEvent = new MainConnection_1.Event({
        start_date: event.start_date,
        end_date: event.end_date,
        title: event.title,
        extract: event.extract,
        visible: event.visible,
        address: event.address,
        image_id: "",
        event_meta: event === null || event === void 0 ? void 0 : event.event_meta,
        event_page_url: "Needs to be implemented",
        organization: {
            organization_id: organization.organization_id,
            organization_name: organization.organization_name
        },
        created_by: req.user._id,
        updated_by: req.user._id
    });
    // validate event object
    const validationError = newEvent.validateSync();
    if (validationError) {
        //deleteImageFile(imagePath)
        return res.status(400).json({ message: validationError.message });
    }
    // Upload the image to cloudinary
    cloudinary_1.v2.uploader.upload_stream({ resource_type: "image" }, uploadDone).end(image);
    function uploadDone(error, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.log("Error in cloudinary.uploader.upload_stream\n", error);
                return res.status(500).json({ error: error });
            }
            // Pass url to newEvent
            newEvent.image_id = result === null || result === void 0 ? void 0 : result.public_id;
            try {
                // save created event to db
                const savedEvent = yield newEvent.save();
                // return saved event to client
                return res.status(201).json(savedEvent);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    }
});
exports.createEvent = createEvent;
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.s;
    const type = req.query.type;
    // PAGINATE
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 3; // Number of items per page
    const skip = (page - 1) * limit;
    if (!type) {
        try {
            const regex = { $regex: search, $options: 'i' };
            const query = {
                $or: [
                    { 'address.city': regex },
                    { 'organization.organization_name': regex },
                    { title: regex }
                ],
                //endDate: { $gte: new Date() } // make sure we dont query ended events
            };
            const events = yield MainConnection_1.Event.find(query).skip(skip).limit(limit).sort({ start_date: 1 }).exec();
            return res.status(200).json(events);
        }
        catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching events' });
        }
    } //return res.status(400).json({ message: "No query type property. Include ?type=" })
    // LOCATION BASED SEARCH
    if (type === 'location') {
        const { latitude, longitude } = req.query;
        const parsedLatitude = parseFloat(latitude) || 60.192059; // Default coords for Helsinki
        const parsedLongitude = parseFloat(longitude) || 24.945831;
        try {
            const events = yield MainConnection_1.Event.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parsedLongitude, parsedLatitude],
                        },
                        distanceField: 'distance',
                        spherical: true,
                        query: {}, // Optional additional query criteria
                        // Additional options if needed
                    },
                },
                // Additional stages if needed
            ]).skip(skip).limit(limit).exec();
            return res.status(200).json(events);
        }
        catch (error) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    }
    // TYPE BASED SEARCH
    const approvedTypes = ['city', 'organization', 'title'];
    if (!approvedTypes.includes(type))
        return res.status(400).json({ message: "Query type " + type + " is not valid. Valid types: " + approvedTypes });
    switch (type) {
        case 'city':
            try {
                const query = { 'address.city': search };
                const events = yield MainConnection_1.Event.find(query).skip(skip).limit(limit).sort({ start_date: 1 }).exec();
                return res.status(200).json(events);
            }
            catch (error) {
                return res.status(500).json({ error: 'An error occurred while fetching events' });
            }
        case 'organization':
            try {
                const query = { 'organization.organization_name': search };
                const events = yield MainConnection_1.Event.find(query).skip(skip).limit(limit).sort({ start_date: 1 }).exec();
                return res.status(200).json(events);
            }
            catch (error) {
                return res.status(500).json({ error: 'An error occurred while fetching events' });
            }
        case 'title':
            try {
                const query = { 'title': search };
                const events = yield MainConnection_1.Event.find(query).skip(skip).limit(limit).sort({ start_date: 1 }).exec();
                return res.status(200).json(events);
            }
            catch (error) {
                return res.status(500).json({ error: 'An error occurred while fetching events' });
            }
    }
});
exports.getEvents = getEvents;
const searchEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const searchTerm = search.toLowerCase();
    if (searchTerm.length < 3)
        return res.status(400).json({ message: "search term needs to be atleast 3 char long" });
    const regex = { $regex: searchTerm, $options: 'i' };
    const endDateFilter = { endDate: { $gte: new Date() } };
    const cityFilter = { 'address.city': regex };
    const organizationFilter = { 'organization.organization_name': regex };
    const titleFilter = { title: regex };
    console.warn("remember to use datefilter in searchEvents");
    try {
        const [distinctCities, distinctOrgNames, distinctTitles] = yield Promise.all([
            MainConnection_1.Event.find({ $and: [cityFilter, /*endDateFilter*/] }).distinct('address.city').exec(),
            MainConnection_1.Event.find({ $and: [organizationFilter, /*endDateFilter*/] }).distinct('organization.organization_name').exec(),
            MainConnection_1.Event.find({ $and: [titleFilter, /*endDateFilter*/] }).distinct('title').exec(),
        ]);
        const cities = distinctCities.map((data) => ({ type: 'city', data: data }));
        const organizations = distinctOrgNames.map((data) => ({ type: 'organization', data: data }));
        const titles = distinctTitles.map((data) => ({ type: 'title', data: data }));
        const results = [...cities, ...organizations, ...titles];
        return res.status(200).json(results);
    }
    catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ error: 'An error occurred while fetching events' });
    }
});
exports.searchEvents = searchEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }
    try {
        const event = yield MainConnection_1.Event.findById(_id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        return res.status(200).json(event);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getEvent = getEvent;
