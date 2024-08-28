const Booth = require("../models/booth");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");

// Create a new booth
exports.createBooth = async (req, res, next) => {
  try {
    const { name, constituencyId, hindiName } = req.body;

    if (!name || !constituencyId || !hindiName) {
      throw new CustomError(
        "All fields (name, constituencyId, hindiName) are required",
        400
      );
    }

    console.log(hindiName);

    const newBooth = await Booth.create({ name, constituencyId, hindiName });

    res
      .status(201)
      .json(
        generateResponse(201, true, "Booth created successfully", newBooth)
      );
  } catch (error) {
    console.log(`Error in createBooth: ${error.message}`);
    next(error);
  }
};

// Get a booth by ID
exports.getBoothById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const booth = await Booth.findById(id);
    if (!booth) {
      throw new CustomError("Booth not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Booth found successfully", booth));
  } catch (error) {
    console.log(`Error in getBoothById: ${error.message}`);
    next(error);
  }
};

// Update a booth by ID
exports.updateBoothById = async (req, res, next) => {
  const { id } = req.params;
  const { name, constituencyId, hindiName } = req.body;

  try {
    console.log(`Attempting to update booth with ID: ${id}`);

    const booth = await Booth.findById(id);

    if (!booth) {
      throw new CustomError("Booth not found", 404);
    }

    const updatedBooth = await Booth.updateById(id, {
      name: name || booth.name,
      constituencyId: constituencyId || booth.constituencyId,
      hindiName: hindiName || booth.hindiName,
    });

    if (!updatedBooth) {
      throw new CustomError("Booth not found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Booth updated successfully", updatedBooth)
      );
  } catch (error) {
    console.log(`Error in updateBoothById: ${error.message}`);
    next(error);
  }
};

// Delete a booth by ID
exports.deleteBoothById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const booth = await Booth.findById(id);

    if (!booth) {
      throw new CustomError("Booth not found", 404);
    }

    console.log(`Attempting to delete booth with ID: ${id}`);
    const deletedBooth = await Booth.deleteById(id);

    if (!deletedBooth) {
      throw new CustomError("Booth not found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Booth deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteBoothById: ${error.message}`);
    next(error);
  }
};

// Get all booths with pagination and search
exports.getBooths = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const booths = await Booth.get(Number(page), Number(limit), query);

    if (!booths.data.length) {
      throw new CustomError("No booths found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "Booths retrieved successfully", booths)
      );
  } catch (error) {
    console.log(`Error in getBooths: ${error.message}`);
    next(error);
  }
};

exports.getAllBooths = async (req, res, next) => {
  try {
    const booths = await Booth.getAll();

    if (!booths.length) {
      throw new CustomError("No booths found", 404);
    }
    res
      .status(200)
      .json(
        generateResponse(200, true, "Booths retrieved successfully", booths)
      );
  } catch (error) {
    next(error);
  }
};
