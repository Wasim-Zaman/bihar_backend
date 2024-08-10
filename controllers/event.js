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
      time,
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
      !time || // Validate time field
      !constituency ||
      !boothNumber ||
      !mobileNumber ||
      status === undefined
    ) {
      throw new CustomError("All required fields must be provided", 400);
    }

    // Parse date and time
    const eventDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    eventDate.setUTCHours(hours, minutes, 0, 0);

    // Create the event
    const newEvent = await Event.create({
      eventTitle,
      date: eventDate, // Store combined date and time as Date object
      time, // Store original time string for reference
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
      newEvent.time
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
  const { eventTitle, date, time, constituency, boothNumber, status } =
    req.body;

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

    // Parse the date and time
    const updatedDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    updatedDate.setUTCHours(hours, minutes, 0, 0);

    // Update the event with new data
    const updatedEvent = await Event.updateById(id, {
      eventTitle,
      date: updatedDate, // Store the combined date and time as a Date object
      time, // Store the time string for reference
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
  console.log("req.params:", req.params); // Log request parameters
  console.log("req.user:", req.user); // Log user object

  const { mobileNumber } = req.params;
  const { page = 1, limit = 20, query = "" } = req.query;

  try {
    if (req.user && req.user.mobileNumber !== mobileNumber) {
      throw new CustomError(
        "Unauthorized access, please enter correct mobile number",
        401
      );
    }

    const events = await Event.getUserEvents(
      mobileNumber,
      Number(page),
      Number(limit),
      query
    );

    if (!events.data.length) {
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
