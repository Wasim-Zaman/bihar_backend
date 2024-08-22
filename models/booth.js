const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Booth {
  static async findById(id) {
    try {
      return await prisma.booth.findUnique({
        where: { id: id },
        include: { constituency: true }, // Include constituency in the result
      });
    } catch (error) {
      console.error("Error finding booth by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating booth with data: ${JSON.stringify(data)}`);
      return await prisma.booth.create({
        data: {
          name: data.name,
          constituency: {
            connect: {
              id: data.constituencyId, // Use `connect` with the `constituency` field
            },
          },
        },
      });
    } catch (error) {
      console.error("Error creating booth:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating booth with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.booth.update({
        where: { id: id },
        data: {
          ...data,
          constituency: data.constituencyId
            ? {
                connect: { id: data.constituencyId }, // Update constituency relation
              }
            : undefined,
        },
      });
    } catch (error) {
      console.error(`Error updating booth with id ${id}:`, error.message);
      throw new Error(`Unable to update booth with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting booth with ID ${id}`);
      return await prisma.booth.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting booth by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.booth.findMany({
        include: { constituency: true }, // Include constituency in the result
      });
    } catch (error) {
      console.error("Error finding all booths:", error);
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

      const booths = await prisma.booth.findMany({
        skip,
        take: limit,
        where,
        include: { constituency: true }, // Include constituency in the result
      });

      const totalBooths = await prisma.booth.count({ where });

      const totalPages = Math.ceil(totalBooths / limit);

      return {
        data: booths,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalBooths,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting booths with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = Booth;
