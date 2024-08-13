const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Grievance {
  static async findById(id) {
    try {
      return await prisma.grievance.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding grievance by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating grievance with data: ${JSON.stringify(data)}`);
      return await prisma.grievance.create({
        data,
      });
    } catch (error) {
      console.error("Error creating grievance:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.grievance.update({
        where: { id: id.toString() },
        data,
      });
    } catch (error) {
      console.error(`Error updating grievance with id ${id}:`, error.message);
      throw new Error(`Unable to update grievance with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting grievance with ID ${id}`);
      return await prisma.grievance.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting grievance by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.grievance.findMany();
    } catch (error) {
      console.error("Error finding all grievances:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [
              { fullName: { contains: query, mode: "insensitive" } },
              { ticketTitle: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated grievances
      const grievances = await prisma.grievance.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of grievances
      const totalGrievances = await prisma.grievance.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalGrievances / limit);

      return {
        data: grievances,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalGrievances,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting grievances with pagination and search:",
        error
      );
      throw error;
    }
  }

  static async getAdminGrievances(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated grievances where isAdmin is true
      const grievances = await prisma.grievance.findMany({
        skip,
        take: limit,
        where: { isAdmin: true },
      });

      // Fetch the total number of admin grievances
      const totalGrievances = await prisma.grievance.count({
        where: { isAdmin: true },
      });

      // Calculate total pages
      const totalPages = Math.ceil(totalGrievances / limit);

      return {
        data: grievances,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalGrievances,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting admin grievances with pagination:", error);
      throw error;
    }
  }
}

module.exports = Grievance;
