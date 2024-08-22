const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Constituency {
  static async findById(id) {
    try {
      return await prisma.constituency.findUnique({
        where: { id: id },
        include: { booths: true }, // Include related booths
      });
    } catch (error) {
      console.error("Error finding constituency by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating constituency with data: ${JSON.stringify(data)}`);
      return await prisma.constituency.create({
        data: {
          ...data,
          booths: data.booths ? { create: data.booths } : undefined, // Optionally create related booths
        },
      });
    } catch (error) {
      console.error("Error creating constituency:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating constituency with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.constituency.update({
        where: { id: id },
        data: {
          ...data,
          booths: data.booths
            ? {
                upsert: data.booths.map((booth) => ({
                  where: { id: booth.id || "" },
                  create: booth,
                  update: booth,
                })),
              }
            : undefined,
        },
      });
    } catch (error) {
      console.error(
        `Error updating constituency with id ${id}:`,
        error.message
      );
      throw new Error(`Unable to update constituency with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting constituency with ID ${id}`);
      return await prisma.constituency.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting constituency by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.constituency.findMany({
        include: { booths: true }, // Include related booths
      });
    } catch (error) {
      console.error("Error finding all constituencies:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      const where = query
        ? {
            OR: [{ name: { contains: query } }],
          }
        : {};

      const constituencies = await prisma.constituency.findMany({
        skip,
        take: limit,
        where,
        include: { booths: true }, // Include related booths
      });

      const totalConstituencies = await prisma.constituency.count({ where });

      const totalPages = Math.ceil(totalConstituencies / limit);

      return {
        data: constituencies,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalConstituencies,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting constituencies with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = Constituency;
