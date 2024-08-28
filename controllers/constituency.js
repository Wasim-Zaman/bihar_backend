const Constituency = require("../models/constituency");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");

// Create a new constituency
exports.createConstituency = async (req, res, next) => {
  try {
    const { name, booths, hindiName } = req.body;

    if (!name || !hindiName) {
      throw new CustomError("All fields (name, hindiName) are required", 400);
    }

    const newConstituency = await Constituency.create({
      name,
      booths,
      hindiName,
    });

    res
      .status(201)
      .json(
        generateResponse(
          201,
          true,
          "Constituency created successfully",
          newConstituency
        )
      );
  } catch (error) {
    console.log(`Error in createConstituency: ${error.message}`);
    next(error);
  }
};

// Get a constituency by ID
exports.getConstituencyById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const constituency = await Constituency.findById(id);
    if (!constituency) {
      throw new CustomError("Constituency not found", 404);
    }
    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Constituency found successfully",
          constituency
        )
      );
  } catch (error) {
    console.log(`Error in getConstituencyById: ${error.message}`);
    next(error);
  }
};

// Update a constituency by ID
exports.updateConstituencyById = async (req, res, next) => {
  const { id } = req.params;
  const { name, booths, hindiName } = req.body;

  try {
    console.log(`Attempting to update constituency with ID: ${id}`);

    const updatedConstituency = await Constituency.updateById(id, {
      name,
      booths,
      hindiName,
    });

    if (!updatedConstituency) {
      throw new CustomError("Constituency not found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Constituency updated successfully",
          updatedConstituency
        )
      );
  } catch (error) {
    console.log(`Error in updateConstituencyById: ${error.message}`);
    next(error);
  }
};

// Delete a constituency by ID
exports.deleteConstituencyById = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete constituency with ID: ${id}`);
    const deletedConstituency = await Constituency.deleteById(id);

    if (!deletedConstituency) {
      throw new CustomError("Constituency not found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Constituency deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteConstituencyById: ${error.message}`);
    next(error);
  }
};

// Get all constituencies with pagination and search
exports.getConstituencies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const constituencies = await Constituency.get(
      Number(page),
      Number(limit),
      query
    );

    if (!constituencies.data.length) {
      throw new CustomError("No constituencies found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Constituencies retrieved successfully",
          constituencies
        )
      );
  } catch (error) {
    console.log(`Error in getConstituencies: ${error.message}`);
    next(error);
  }
};

exports.getAllConstituencies = async (req, res, next) => {
  try {
    const constituencies = await Constituency.getAll();

    if (!constituencies || constituencies.length <= 0) {
      throw new CustomError("No constituencies found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Constituencies retrieved successfully",
          constituencies
        )
      );
  } catch (error) {
    console.log(`Error in getAllConstituencies: ${error.message}`);
    next(error);
  }
};
