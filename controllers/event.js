const moment = require("moment-timezone");

const Event = require("../models/event");
const User = require("../models/user");
const EpicUser = require("../models/epicUser");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const scheduleNotification = require("../scripts/scheduleNotification");
const fileHelper = require("../utils/file");

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
      owner,
      categoryName,
      place,
      status,
    } = req.body;

    // Check if the owner is a valid user type
    if (owner.toLowerCase() !== "epic user" && owner.toLowerCase() !== "user") {
      throw new CustomError(
        "Unauthorized access, you are not the User or an Epic User",
        401
      );
    }

    let user;
    if (owner === "user") {
      user = await User.findById(req.user.id);
    } else {
      user = await EpicUser.findById(req.user.id);
    }

    if (!user) {
      throw new CustomError(
        "User not found with the entered mobile number",
        404
      );
    }

    console.log("Received event creation request:", req.body);

    // Check if mobile number matches
    if (req.user.mobileNumber !== mobileNumber) {
      throw new CustomError(
        "Unauthorized access, please enter correct mobile number",
        401
      );
    }

    console.log("Files received:", req.files);

    const documents =
      req.files && req.files.documents
        ? req.files.documents.map((file) => file.path)
        : [];

    if (
      !eventTitle ||
      !date ||
      !fromTime ||
      !toTime ||
      !mobileNumber ||
      !owner ||
      !categoryName ||
      !place ||
      status === undefined
    ) {
      throw new CustomError(
        "All required fields must be provided ['eventTitle', 'date', 'fromTime', 'toTime', 'mobileNumber', 'owner', 'categoryName', 'place' ]'",
        400
      );
    }

    // Convert the event date to a moment object in UTC
    const eventDate = moment.tz(date, "UTC").startOf("day");
    console.log("Parsed event date (UTC):", eventDate);

    // Get the current date and the date for tomorrow
    const today = moment().startOf("day"); // Current date (start of day)
    const tomorrow = moment().add(1, "days").startOf("day"); // Tomorrow date (start of day)

    // Check if the selected event date is today or tomorrow
    if (eventDate.isSame(today) || eventDate.isSame(tomorrow)) {
      // Delete the uploaded files before throwing an error
      deleteUploadedFiles(req.files);
      throw new CustomError(
        "You cannot create an event for today or tomorrow. Please select a date at least two days in the future.",
        400
      );
    }

    // Check if an approved event exists on the same date
    const isApprovedEventOnSameDate = await Event.checkForApprovedEventOnDate(
      eventDate.toDate()
    );

    if (isApprovedEventOnSameDate) {
      // Delete the uploaded files before throwing an error
      deleteUploadedFiles(req.files);
      throw new CustomError(
        "An approved event already exists for the selected date. You cannot create another event on this date.",
        400
      );
    }

    // Event data passes all restrictions, now create the event in the database
    const newEvent = await Event.create({
      eventTitle,
      date: eventDate.toDate(), // Convert moment object back to Date
      fromTime,
      toTime,
      constituency: constituency || user.legislativeConstituency,
      boothNumber: boothNumber || user.boothNameOrNumber,
      mobileNumber,
      owner: owner.toLowerCase(),
      status: parseInt(status, 10),
      categoryName,
      place,
      documents,
    });

    console.log(
      `Event created with ID: ${newEvent.id} and title: ${eventTitle}`
    );

    // Schedule the notification
    scheduleNotification(newEvent, user);

    console.log("Notification scheduled.");

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

exports.createEventV3 = async (req, res, next) => {
  try {
    const {
      eventTitle,
      date,
      fromTime,
      toTime,
      constituency,
      boothNumber,
      mobileNumber,
      owner,
      categoryName,
      place,
      status,
    } = req.body;

    // Check if the owner is a valid user type
    if (owner.toLowerCase() !== "epic user" && owner.toLowerCase() !== "user") {
      throw new CustomError(
        "Unauthorized access, you are not the User or an Epic User",
        401
      );
    }

    let user;
    if (owner.toLowerCase() === "user") {
      user = await User.findById(req.user.id);
    } else {
      user = await EpicUser.findById(req.user.id);
    }

    if (!user) {
      throw new CustomError(
        "User not found with the entered mobile number",
        404
      );
    }

    console.log("Received event creation request:", req.body);

    // Check if mobile number matches
    if (req.user.mobileNumber !== mobileNumber) {
      throw new CustomError(
        "Unauthorized access, please enter correct mobile number",
        401
      );
    }

    console.log("Files received:", req.files);

    const documents =
      req.files && req.files.documents
        ? req.files.documents.map((file) => file.path)
        : [];

    // Validate required fields
    if (
      !eventTitle ||
      !date ||
      !fromTime ||
      !toTime ||
      !mobileNumber ||
      !owner ||
      !categoryName ||
      !place ||
      status === undefined
    ) {
      throw new CustomError(
        "All required fields must be provided ['eventTitle', 'date', 'fromTime', 'toTime', 'mobileNumber', 'owner', 'categoryName', 'place' ]'",
        400
      );
    }

    // Convert the event date to a moment object in UTC
    const eventDate = moment.tz(date, "UTC").startOf("day");
    console.log("Parsed event date (UTC):", eventDate);

    // Get the current date and the date for tomorrow
    const today = moment().startOf("day"); // Current date (start of day)
    const tomorrow = moment().add(1, "days").startOf("day"); // Tomorrow date (start of day)

    // Check if the selected event date is today or tomorrow
    if (eventDate.isSame(today) || eventDate.isSame(tomorrow)) {
      // Delete the uploaded files before throwing an error
      deleteUploadedFiles(req.files);
      throw new CustomError(
        "You cannot create an event for today or tomorrow. Please select a date at least two days in the future.",
        400
      );
    }

    // Check if an approved event exists on the same date and time
    const isApprovedEventOnSameDateAndTime =
      await Event.checkForApprovedEventOnDateAndTime(
        eventDate.toDate(),
        fromTime,
        toTime
      );

    if (isApprovedEventOnSameDateAndTime) {
      // Delete the uploaded files before throwing an error
      deleteUploadedFiles(req.files);
      throw new CustomError(
        "An approved event already exists on the selected date and time. You cannot create another event on this date and time.",
        400
      );
    }

    // Event data passes all restrictions, now create the event in the database
    const newEvent = await Event.create({
      eventTitle,
      date: eventDate.toDate(), // Convert moment object back to Date
      fromTime,
      toTime,
      constituency: constituency || user.legislativeConstituency,
      boothNumber: boothNumber || user.boothNameOrNumber,
      mobileNumber,
      owner: owner.toLowerCase(),
      status: parseInt(status, 10),
      categoryName,
      place,
      documents,
    });

    console.log(
      `Event created with ID: ${newEvent.id} and title: ${eventTitle}`
    );

    // Schedule the notification
    scheduleNotification(newEvent, user);

    console.log("Notification scheduled.");

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

exports.createAdminEvent = async (req, res, next) => {
  try {
    const {
      eventTitle,
      date,
      fromTime,
      toTime,
      constituency,
      boothNumber,
      categoryName,
      place,
      status,
    } = req.body;

    // if status is not 0,1,2,3 then throw error
    if (![0, 1, 2, 3].includes(Number(status))) {
      throw new CustomError(
        "Invalid status provided, it must be one of these [0,1,2,3]",
        400
      );
    }

    console.log("Files received:", req.files);

    const documents =
      req.files && req.files.documents
        ? req.files.documents.map((file) => file.path)
        : [];

    if (!eventTitle || !date || !fromTime || !toTime || status === undefined) {
      throw new CustomError("All required fields must be provided", 400);
    }

    const eventDate = moment.tz(date, "UTC").toDate();
    console.log("Parsed event date (UTC):", eventDate);

    const newEvent = await Event.create({
      eventTitle,
      date: eventDate,
      fromTime,
      toTime,
      constituency: constituency || null,
      boothNumber: boothNumber || null,
      owner: "admin",
      status: parseInt(status, 10),
      categoryName,
      place,
      documents,
    });

    console.log(
      `Event created with ID: ${newEvent.id} and title: ${eventTitle}`
    );

    // scheduleNotification(newEvent, user);

    console.log("Notification scheduled.");

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
    categoryName,
    place,
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
      categoryName,
      place,
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

    if (event.documents && event.documents.length > 0) {
      for (const file of event.documents) {
        await fileHelper.deleteFile(file);
      }
    }
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
  const { page = 1, limit = 20, query = "", tab } = req.query;

  try {
    // Validate the tab parameter
    if (tab && !["onGoing", "history"].includes(tab)) {
      throw new CustomError(
        "Invalid tab value. Must be 'onGoing' or 'history'.",
        400
      );
    }

    const events = await Event.getUserEvents(
      mobileNumber,
      Number(page),
      Number(limit),
      query,
      tab
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

exports.getAdminSideEventsByDate = async (req, res, next) => {
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

exports.getAdminSideRequestedEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Fetch the events based on the user's mobile number
    const events = await Event.getAdminSideRequestedEvents(
      Number(page),
      Number(limit)
    );

    if (events.data.length === 0) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    console.error(`Error in getAdminSideRequestedEvents: ${error.message}`);
    next(
      new CustomError(
        `Unable to retrieve events: ${error.message}`,
        error.statusCode || 500
      )
    );
  }
};

exports.getAdminSideEventsList = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Fetch the events based on the user's mobile number
    const events = await Event.getAdminSideEventsList(
      Number(page),
      Number(limit)
    );

    if (events.data.length === 0) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    next(
      new CustomError(
        `Unable to retrieve events: ${error.message}`,
        error.statusCode || 500
      )
    );
  }
};

exports.getAdminSideEventsListAccepted = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // Fetch the events based on the user's mobile number
    const events = await Event.getAdminSideEventsList(
      Number(page),
      Number(limit)
    );

    if (events.data.length === 0) {
      throw new CustomError("No events found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Events retrieved successfully", events)
      );
  } catch (error) {
    next(
      new CustomError(
        `Unable to retrieve events: ${error.message}`,
        error.statusCode || 500
      )
    );
  }
};

exports.sendNotification = async (req, res, next) => {
  // Schedule the notification
  try {
    // Dummy data
    const mobileNumber = "+923201704665";
    const eventId = "event123";
    const eventTitle = "Team Meeting";
    const eventDate = "2024-08-12T06:30:28.534Z"; // UTC time
    const eventTime = "20:28";

    scheduleNotification(
      mobileNumber,
      eventId,
      eventTitle,
      eventDate,
      eventTime
    );

    res.send("sent");
  } catch (err) {
    next(err);
  }
};

// Helper function to delete uploaded files if event creation fails
function deleteUploadedFiles(files) {
  if (files && files.documents) {
    files.documents.forEach((file) => {
      fileHelper.deleteFile(file.path);
    });
  }
}
