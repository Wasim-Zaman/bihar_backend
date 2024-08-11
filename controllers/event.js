const Event = require("../models/event");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const scheduleNotification = require("../scripts/scheduleNotification");

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    const {
      eventTitle,
      date,
      fromTime,
      toTime,
      constituency,
      boothNumber,
      mobileNumber,
      status,
    } = req.body;

    // Check if the mobile number matches the authenticated user's mobile number
    if (req.user.mobileNumber !== mobileNumber) {
      throw new CustomError(
        "Unauthorized access, please enter correct mobile number",
        401
      );
    }

    // Assuming document upload is handled by Multer and stored in req.file
    const document = req.file ? req.file.path : null;

    // Validate necessary fields
    if (
      !eventTitle ||
      !date ||
      !fromTime ||
      !toTime ||
      !constituency ||
      !boothNumber ||
      !mobileNumber ||
      status === undefined
    ) {
      throw new CustomError("All required fields must be provided", 400);
    }

    // Parse date and times
    const eventDate = new Date(date);

    // Create the event
    const newEvent = await Event.create({
      eventTitle,
      date: eventDate, // Store the event date
      fromTime, // Store original fromTime string
      toTime, // Store original toTime string
      constituency,
      boothNumber: parseInt(boothNumber, 10),
      mobileNumber,
      status: parseInt(status, 10), // Ensure the status is an integer
      document,
    });

    console.log(`Event created with title: ${eventTitle}`);

    // Schedule the notification
    scheduleNotification(
      newEvent.mobileNumber,
      newEvent.id,
      newEvent.eventTitle,
      newEvent.date,
      newEvent.fromTime
    );

    // Send response back to the client
    res
      .status(201)
      .json(
        generateResponse(201, true, "Event created successfully", newEvent)
      );
  } catch (error) {
    console.log(`Error in createEvent: ${error.message}`);
    next(error);
  }
};

exports.createEventV2 = async (req, res, next) => {
  try {
    const {
      eventTitle,
      date,
      fromTime,
      toTime,
      constituency,
      boothNumber,
      mobileNumber,
      status,
    } = req.body;

    // Check if the mobile number matches the authenticated user's mobile number
    if (req.user.mobileNumber !== mobileNumber) {
      throw new CustomError(
        "Unauthorized access, please enter correct mobile number",
        401
      );
    }

    // Assuming document uploads are handled by Multer and stored in req.files
    const documents = req.files
      ? req.files.documents.map((file) => file.path)
      : [];

    // Validate necessary fields
    if (
      !eventTitle ||
      !date ||
      !fromTime ||
      !toTime ||
      !constituency ||
      !boothNumber ||
      !mobileNumber ||
      status === undefined
    ) {
      throw new CustomError("All required fields must be provided", 400);
    }

    // Parse date and times
    const eventDate = new Date(date);

    // Create the event
    const newEvent = await Event.create({
      eventTitle,
      date: eventDate, // Store the event date
      fromTime, // Store original fromTime string
      toTime, // Store original toTime string
      constituency,
      boothNumber: parseInt(boothNumber, 10),
      mobileNumber,
      status: parseInt(status, 10), // Ensure the status is an integer
      documents, // Store the array of document paths as a JSON array
    });

    console.log(`Event created with title: ${eventTitle}`);

    // Schedule the notification
    scheduleNotification(
      newEvent.mobileNumber,
      newEvent.id,
      newEvent.eventTitle,
      newEvent.date,
      newEvent.fromTime
    );

    // Send response back to the client
    res
      .status(201)
      .json(
        generateResponse(201, true, "Event created successfully", newEvent)
      );
  } catch (error) {
    console.log(`Error in createEventV2: ${error.message}`);
    next(error);
  }
};

// Get an event by ID
exports.getEventById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Event found successfully", event));
  } catch (error) {
    console.log(`Error in getEventById: ${error.message}`);
    next(error);
  }
};

// Get paginated events with optional search query
exports.getEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const events = await Event.get(Number(page), Number(limit), query);

    if (!events.data.length) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    console.log(`Error in getEvents: ${error.message}`);
    next(error);
  }
};

// Update an event by ID
exports.updateEventById = async (req, res, next) => {
  const { id } = req.params;
  const {
    eventTitle,
    date,
    fromTime,
    toTime,
    constituency,
    boothNumber,
    status,
  } = req.body;

  try {
    console.log(`Attempting to update event with ID: ${id}`);

    // Find the existing event by ID
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    // Handle document upload
    let document = req.file ? req.file.path : event.document;

    // If a new document is uploaded, delete the old one
    if (req.file && event.document) {
      await fileHelper.deleteFile(event.document);
    }

    // Update the event with new data
    const updatedEvent = await Event.updateById(id, {
      eventTitle,
      date: new Date(date), // Store the event date
      fromTime, // Store the updated fromTime string
      toTime, // Store the updated toTime string
      constituency,
      boothNumber: parseInt(boothNumber, 10),
      status: parseInt(status, 10), // Ensure status is correctly parsed as an integer
      document,
    });

    console.log(`Event updated successfully with ID: ${id}`);

    res
      .status(200)
      .json(
        generateResponse(200, true, "Event updated successfully", updatedEvent)
      );
  } catch (error) {
    console.log(`Error in updateEventById: ${error.message}`);
    next(error);
  }
};

exports.updateEventByIdV2 = async (req, res, next) => {
  const { id } = req.params;
  const {
    eventTitle,
    date,
    fromTime,
    toTime,
    constituency,
    boothNumber,
    status,
  } = req.body;

  try {
    console.log(`Attempting to update event with ID: ${id}`);

    // Find the existing event by ID
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    // Handle multiple document uploads
    let documents = event.documents || [];

    if (req.files && req.files.documents.length > 0) {
      // Delete old documents if new ones are uploaded
      if (event.documents && event.documents.length > 0) {
        for (const file of event.documents) {
          await fileHelper.deleteFile(file);
        }
      }

      // Add new documents
      documents = req.files.documents.map((file) => file.path);
    }

    // Update the event with new data
    const updatedEvent = await Event.updateById(id, {
      eventTitle,
      date: new Date(date), // Store the event date
      fromTime, // Store the updated fromTime string
      toTime, // Store the updated toTime string
      constituency,
      boothNumber: parseInt(boothNumber, 10),
      status: parseInt(status, 10), // Ensure status is correctly parsed as an integer
      documents, // Update the documents field with new paths
    });

    console.log(`Event updated successfully with ID: ${id}`);

    res
      .status(200)
      .json(
        generateResponse(200, true, "Event updated successfully", updatedEvent)
      );
  } catch (error) {
    console.log(`Error in updateEventByIdV2: ${error.message}`);
    next(error);
  }
};

// Delete an event by ID
exports.deleteEventById = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete event with ID: ${id}`);
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    await fileHelper.deleteFile(event.document);
    await Event.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Event deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteEventById: ${error.message}`);
    next(error);
  }
};

// Update event status based on mobile number
exports.updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    const updatedEvent = await Event.updateStatus(id, parseInt(status));

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Event status updated successfully",
          updatedEvent
        )
      );
  } catch (error) {
    console.log(`Error in updateStatusByMobileNumber: ${error.message}`);
    next(error);
  }
};

// Get events by mobile number with status 2
exports.getUserEvents = async (req, res, next) => {
  const { mobileNumber } = req.user;
  const { page = 1, limit = 20, query = "" } = req.query;

  try {
    const events = await Event.getUserEvents(
      mobileNumber,
      Number(page),
      Number(limit),
      query
    );

    if (!events.data.length > 0) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    console.log(`Error in getUserEvents: ${error.message}`);
    next(error);
  }
};

exports.getPaginatedEventsByDate = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, date } = req.query;
    const { mobileNumber } = req.user;

    if (!date) {
      throw new CustomError("Date must be provided", 400);
    }

    const events = await Event.getEventsByDate(
      mobileNumber,
      date,
      Number(page),
      Number(limit)
    );

    if (events.data.length === 0) {
      throw new CustomError("No events found for the given date", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    console.log(`Error in getPaginatedEventsByDate: ${error.message}`);
    next(error);
  }
};
