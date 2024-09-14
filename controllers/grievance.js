const Grievance = require("../models/grievance");
const Notification = require("../models/notification");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const User = require("../models/user");
const EpicUser = require("../models/epicUser");
const fileHelper = require("../utils/file");
const { sendNotification } = require("../scripts/sendNotification");

exports.createGrievance = async (req, res, next) => {
  try {
    const {
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age,
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
    } = req.body;

    if (req.user.mobileNumber != contactNumber) {
      throw new CustomError(
        "Contact number does not match with user's mobile number",
        400
      );
    }

    const attachment = req.file ? req.file.path : null;

    if (!ticketTitle || !description) {
      throw new CustomError("Ticket title and description are required", 400);
    }

    const grievance = await Grievance.create({
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age: Number(age),
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      attachment,
    });

    console.log(`Grievance created with title: ${ticketTitle}`);
    res
      .status(201)
      .json(generateResponse(201, true, "Grievance created", grievance));
  } catch (error) {
    console.log(`Error in createGrievance: ${error.message}`);
    next(error);
  }
};

exports.createGrievanceV2 = async (req, res, next) => {
  try {
    const {
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age,
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      owner = "user",
      patientName,
      aadharNo,
      ayshmanCardNo,
      hospitalName,
      pnrNo,
      dateOfJur,
      fromStation,
      toStation,
      trainNo,
      trainName,
      travelClass, // Updated field name
      isHealth,
      isRailway,
    } = req.body;

    if (owner.toLowerCase() !== "epic user" && owner.toLowerCase() !== "user") {
      throw new CustomError(
        "Unauthorized access, you are not the User or an Epic User",
        401
      );
    }

    let user;
    if (owner === "user") {
      user = await User.findByMobileNumber(contactNumber);
    } else {
      user = await EpicUser.findByMobileNumber(contactNumber);
    }

    if (!user) {
      throw new CustomError(
        "User not found with the entered mobile number",
        404
      );
    }

    if (req.user.mobileNumber != contactNumber) {
      throw new CustomError(
        "Contact number does not match with user's mobile number",
        400
      );
    }

    // Handling multiple attachments
    const attachments =
      req.files && req.files.attachments
        ? req.files.attachments.map((file) => file.path)
        : [];

    // Handling patient-specific attachments
    const patientAttachments =
      req.files && req.files.patientAttachments
        ? req.files.patientAttachments.map((file) => file.path)
        : [];

    if (!ticketTitle || !description) {
      throw new CustomError("Ticket title and description are required", 400);
    }

    const grievance = await Grievance.create({
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age: Number(age),
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      patientName,
      aadharNo,
      ayshmanCardNo,
      hospitalName,
      pnrNo,
      dateOfJur: dateOfJur ? new Date(dateOfJur) : null,
      fromStation,
      toStation,
      trainNo,
      trainName,
      travelClass, // Updated field name
      isHealth: isHealth ? Boolean(isHealth) : false,
      isRailway: isRailway ? Boolean(isRailway) : false,
      attachments,
      patientAttachments, // Added patient-specific attachments
    });

    console.log(`Grievance created with title: ${ticketTitle}`);
    res
      .status(201)
      .json(generateResponse(201, true, "Grievance created", grievance));
  } catch (error) {
    console.log(`Error in createGrievance: ${error.message}`);
    next(error);
  }
};

exports.getGrievanceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Grievance found", grievance));
  } catch (error) {
    console.log(`Error in getGrievanceById: ${error.message}`);
    next(error);
  }
};

exports.getGrievances = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const grievances = await Grievance.get(Number(page), Number(limit), query);

    if (!grievances.data.length) {
      throw new CustomError("No grievances found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Grievances retrieved successfully",
          grievances
        )
      );
  } catch (error) {
    console.log(`Error in getGrievances: ${error.message}`);
    next(error);
  }
};

exports.updateGrievance = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    fatherName,
    legislativeConstituency,
    boothNameOrNumber,
    contactNumber,
    gender,
    age,
    voterId,
    category,
    subCategory,
    ticketTitle,
    description,
  } = req.body;

  try {
    console.log(`Attempting to update grievance with ID: ${id}`);
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }

    let attachment = req.file ? req.file.path : grievance.attachment;

    if (req.file) {
      await fileHelper.deleteFile(grievance.attachment);
    }

    const updatedGrievance = await Grievance.updateById(id, {
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age,
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      attachment,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "Grievance updated", updatedGrievance));
  } catch (error) {
    console.log(`Error in updateGrievance: ${error.message}`);
    next(error);
  }
};

exports.updateGrievanceV2 = async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    fatherName,
    legislativeConstituency,
    boothNameOrNumber,
    contactNumber,
    gender,
    age,
    voterId,
    category,
    subCategory,
    ticketTitle,
    description,
    status,
    note,
    patientName,
    aadharNo,
    ayshmanCardNo,
    hospitalName,
  } = req.body;

  try {
    // Validate status if provided
    if (status) {
      if (![0, 1, 2, 3].includes(Number(status))) {
        throw new CustomError(
          "Invalid status provided, it must be one of these [0,1,2,3]",
          400
        );
      }
    }

    console.log(`Attempting to update grievance with ID: ${id}`);

    // Find the grievance by ID
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }

    // Handle multiple general attachments
    let attachments = grievance.attachments || [];
    if (
      req.files &&
      req.files.attachments &&
      req.files.attachments.length > 0
    ) {
      // Delete old attachments if new ones are uploaded
      if (grievance.attachments && grievance.attachments.length > 0) {
        for (const file of grievance.attachments) {
          await fileHelper.deleteFile(file);
        }
      }
      // Add new attachments
      attachments = req.files.attachments.map((file) => file.path);
    }

    // Handle patient-specific attachments
    let patientAttachments = grievance.patientAttachments || [];
    if (
      req.files &&
      req.files.patientAttachments &&
      req.files.patientAttachments.length > 0
    ) {
      // Delete old patient-specific attachments if new ones are uploaded
      if (
        grievance.patientAttachments &&
        grievance.patientAttachments.length > 0
      ) {
        for (const file of grievance.patientAttachments) {
          await fileHelper.deleteFile(file);
        }
      }
      // Add new patient attachments
      patientAttachments = req.files.patientAttachments.map(
        (file) => file.path
      );
    }

    // Update the grievance with the new or existing data
    const updatedGrievance = await Grievance.updateById(id, {
      fullName: fullName || grievance.fullName,
      fatherName: fatherName || grievance.fatherName,
      legislativeConstituency:
        legislativeConstituency || grievance.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber || grievance.boothNameOrNumber,
      contactNumber: contactNumber || grievance.contactNumber,
      gender: gender || grievance.gender,
      age: age || grievance.age,
      voterId: voterId || grievance.voterId,
      category: category || grievance.category,
      subCategory: subCategory || grievance.subCategory,
      ticketTitle: ticketTitle || grievance.ticketTitle,
      description: description || grievance.description,
      attachments,
      status: Number(status || grievance.status),
      note: note || grievance.note,
      patientName: patientName || grievance.patientName,
      aadharNo: aadharNo || grievance.aadharNo,
      ayshmanCardNo: ayshmanCardNo || grievance.ayshmanCardNo,
      hospitalName: hospitalName || grievance.hospitalName,
      patientAttachments, // Include updated patient-specific attachments
    });

    res
      .status(200)
      .json(generateResponse(200, true, "Grievance updated", updatedGrievance));
  } catch (error) {
    console.log(`Error in updateGrievance: ${error.message}`);
    next(error);
  }
};

exports.deleteGrievance = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete grievance with ID: ${id}`);
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }

    if (grievance.attachments && grievance.attachments.length > 0) {
      for (const file of grievance.attachments) {
        await fileHelper.deleteFile(file);
      }
    }
    await Grievance.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Grievance deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteGrievance: ${error.message}`);
    next(error);
  }
};

exports.createAdminGrievance = async (req, res, next) => {
  try {
    const {
      fullName,
      fatherName,
      legislativeConstituency,
      boothNameOrNumber,
      contactNumber,
      gender,
      age,
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      isAdmin,
    } = req.body;

    const user = await User.findByMobileNumber(contactNumber);

    if (!user) {
      throw new CustomError(
        "User not found with the entered mobile number",
        404
      );
    }

    if (![0, 1, 2, 3].includes(Number(status))) {
      throw new CustomError(
        "Invalid status provided, it must be one of these [0,1,2,3]",
        400
      );
    }

    // Assuming multiple attachments are handled by Multer and stored in req.files
    console.log(req.files);

    const attachments =
      req.files && req.files.attachments
        ? req.files.attachments.map((file) => file.path)
        : [];

    if (!ticketTitle || !description || !isAdmin) {
      throw new CustomError(
        "Ticket title, isAdmin and description are required",
        400
      );
    }

    const grievance = await Grievance.create({
      fullName: fullName || user.fullName,
      fatherName: fatherName || user.fatherName,
      legislativeConstituency:
        legislativeConstituency || user.legislativeConstituency,
      boothNameOrNumber: boothNameOrNumber || user.boothNameOrNumber,
      contactNumber,
      gender: gender || user.gender,
      age: Number(age ? age : user.age),
      voterId,
      category,
      subCategory,
      ticketTitle,
      description,
      isAdmin: true,
      attachments,
    });

    console.log(`Grievance created with title: ${ticketTitle}`);
    res
      .status(201)
      .json(generateResponse(201, true, "Grievance created", grievance));
  } catch (error) {
    console.log(`Error in createGrievance: ${error.message}`);
    next(error);
  }
};

exports.getAdminGrievances = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const adminGrievances = await Grievance.getAdminGrievances(
      req.user.mobileNumber,
      Number(page),
      Number(limit)
    );

    if (!adminGrievances || adminGrievances.length <= 0) {
      throw new CustomError("No admin grievances found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Admin grievances retrieved successfully",
          adminGrievances
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.getGrievancesByTabName = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { tab } = req.query;

    if (tab.toLowerCase() !== "accepted" && tab.toLowerCase() !== "completed") {
      throw new CustomError(
        "Invalid tab name, tab name must be 'accepted' or 'completed'",
        400
      );
    }

    const grievances = await Grievance.getGrievancesByTab(
      req.user.mobileNumber,
      tab,
      Number(page),
      Number(limit)
    );

    if (!grievances || grievances.length <= 0) {
      throw new CustomError("No admin grievances found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Admin grievances retrieved successfully",
          grievances
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.getAssignedGrievances = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const grievances = await Grievance.getAssignedGrievances(
      req.user.mobileNumber,
      Number(page),
      Number(limit)
    );

    if (!grievances || grievances.length <= 0) {
      throw new CustomError("No grievances found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Grievances retrieved successfully",
          grievances
        )
      );
  } catch (error) {
    next(error);
  }
};

exports.assignGrievance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contactNumber } = req.body;

    if (!contactNumber) {
      throw new CustomError("Contact number is required", 400);
    }

    let user;
    user = await User.findByMobileNumber(contactNumber);

    if (!user) {
      user = await EpicUser.findByMobileNumber(contactNumber);
      if (!user) {
        throw new CustomError(
          "User not found with the entered mobile number",
          404
        );
      }
    }

    const grievance = await Grievance.findById(id);

    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }

    const updatedGrievance = await Grievance.assignTo(id, contactNumber);

    // Add this grievance to the Notification table
    const notification = await Notification.create({
      title: `Grievance Assigned: ${grievance.ticketTitle}`,
      description: `Grievance with ID ${grievance.id} has been assigned to ${contactNumber}.`,
      date: new Date(), // You can set this to the current date
      time: new Date().toISOString().split("T")[1].slice(0, 5),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Set the timezone
      userId: user.id,
    });

    // send notification

    await sendNotification(
      user.fcmToken,
      notification.title,
      notification.description
    );

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Grievance assigned successfully",
          updatedGrievance
        )
      );
  } catch (error) {
    console.error(`Error in assignGrievance: ${error.message}`);
    next(error);
  }
};

exports.updateGrievanceStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate that status is provided and is a valid value
    if (
      typeof status === "undefined" ||
      ![0, 1, 2, 3].includes(Number(status))
    ) {
      throw new CustomError(
        "Invalid status provided, it must be one of these [0, 1, 2, 3]",
        400
      );
    }

    console.log(`Attempting to update status of grievance with ID: ${id}`);

    const updatedGrievance = await Grievance.updateStatus(id, Number(status));

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Grievance status updated",
          updatedGrievance
        )
      );
  } catch (error) {
    console.error(`Error in updateGrievanceStatus: ${error.message}`);
    next(error);
  }
};
