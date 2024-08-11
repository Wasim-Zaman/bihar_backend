const Grievance = require("../models/grievance");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");

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
    } = req.body;

    if (req.user.mobileNumber != contactNumber) {
      throw new CustomError(
        "Contact number does not match with user's mobile number",
        400
      );
    }

    // Assuming multiple attachments are handled by Multer and stored in req.files
    const attachments = req.files
      ? req.files.attachments.map((file) => file.path)
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
      attachments, // Store the array of attachment paths
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
  } = req.body;

  try {
    console.log(`Attempting to update grievance with ID: ${id}`);
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      throw new CustomError("Grievance not found", 404);
    }

    // Handle multiple attachments
    let attachments = grievance.attachments || [];

    if (req.files && req.files.attachments.length > 0) {
      // Delete old attachments if new ones are uploaded
      if (grievance.attachments && grievance.attachments.length > 0) {
        for (const file of grievance.attachments) {
          await fileHelper.deleteFile(file);
        }
      }

      // Add new attachments
      attachments = req.files.attachments.map((file) => file.path);
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
      attachments,
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

    await fileHelper.deleteFile(grievance.attachment);
    await Grievance.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Grievance deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteGrievance: ${error.message}`);
    next(error);
  }
};
