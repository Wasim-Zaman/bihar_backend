const Event = require("../models/event");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");

// Create a new event
exports.createEvent = async (req, res, next) => {
  try {
    const { eventTitle, date, constituency, boothNumber, mobileNumber } =
      req.body;

    if (req.user.mobileNumber != mobileNumber) {
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
      !constituency ||
      !boothNumber ||
      !mobileNumber
    ) {
      throw new CustomError("All required fields must be provided", 400);
    }

    const newEvent = await Event.create({
      eventTitle,
      date: new Date(date),
      constituency,
      boothNumber: parseInt(boothNumber),
      mobileNumber,
      document,
    });

    console.log(`Event created with title: ${eventTitle}`);
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

// Get all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.getAll();

    if (!events.length) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    console.log(`Error in getAllEvents: ${error.message}`);
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
  const { eventTitle, date, constituency, boothNumber } = req.body;

  try {
    console.log(`Attempting to update event with ID: ${id}`);
    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    let document = req.file ? req.file.path : event.document;

    if (req.file) {
      await fileHelper.deleteFile(event.document);
    }

    const updatedEvent = await Event.updateById(id, {
      eventTitle,
      date: new Date(date),
      constituency,
      boothNumber: parseInt(boothNumber),
      document,
    });

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
    console.log(
      `Updating status for event with mobile number: ${mobileNumber}`
    );

    const event = await Event.findById(id);
    if (!event) {
      throw new CustomError("Event not found", 404);
    }

    const updatedEvent = await Event.updateStatus(
      mobileNumber,
      parseInt(status)
    );

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
exports.getEventsByMobileNumberWithStatus2 = async (req, res, next) => {
  const { mobileNumber } = req.params;

  try {
    console.log(
      `Fetching events for mobile number: ${mobileNumber} with status 2`
    );
    const events = await Event.getByMobileNumberWithStatus2(mobileNumber);

    if (!events.length) {
      throw new CustomError("No events found with status 2", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Events with status 2 retrieved successfully",
          events
        )
      );
  } catch (error) {
    console.log(
      `Error in getEventsByMobileNumberWithStatus2: ${error.message}`
    );
    next(error);
  }
};
