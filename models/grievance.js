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
              { fullName: { contains: query } },
              { ticketTitle: { contains: query } },
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

  static async getAdminGrievances(contactNumber, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated grievances where isAdmin is true and contactNumber matches
      const grievances = await prisma.grievance.findMany({
        skip,
        take: limit,
        where: {
          isAdmin: true,
          contactNumber: contactNumber,
        },
      });

      // Fetch the total number of admin grievances with the specified contactNumber
      const totalGrievances = await prisma.grievance.count({
        where: {
          isAdmin: true,
          contactNumber: contactNumber,
        },
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
      console.error(
        "Error getting admin grievances with pagination and contact number:",
        error
      );
      throw error;
    }
  }

  static async getGrievancesByTab(contactNumber, tab, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const status =
        tab === "accepted"
          ? {
              in: [0, 1],
            }
          : {
              in: [2, 3],
            };

      // Fetch the paginated grievances where status is 0 or 1 and contactNumber matches
      const grievances = await prisma.grievance.findMany({
        skip,
        take: limit,
        where: {
          contactNumber: contactNumber,
          status: status,
        },
      });

      // Fetch the total number of grievances with the specified contactNumber and status 0 or 1
      const totalGrievances = await prisma.grievance.count({
        where: {
          contactNumber: contactNumber,
          status: status,
        },
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
      console.error(
        "Error getting grievances with pagination and contact number:",
        error
      );
      throw error;
    }
  }

  static async getAssignedGrievances(contactNumber, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch the paginated grievances where assignedTo equals contactNumber and is not null
      const grievances = await prisma.grievance.findMany({
        skip,
        take: limit,
        where: {
          assignedTo: contactNumber,
          NOT: {
            assignedTo: null,
          },
        },
      });

      // Fetch the total number of grievances with the specified contactNumber and assignedTo is not null
      const totalGrievances = await prisma.grievance.count({
        where: {
          assignedTo: contactNumber,
          NOT: {
            assignedTo: null,
          },
        },
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
      console.error(
        "Error getting grievances with pagination and contact number:",
        error
      );
      throw error;
    }
  }

  static async assignTo(id, contactNumber) {
    try {
      // Update the assignedTo field for the specified grievance ID
      const updatedGrievance = await prisma.grievance.update({
        where: { id: id },
        data: { assignedTo: contactNumber },
      });

      return updatedGrievance;
    } catch (error) {
      console.error(
        `Error assigning contact number to grievance with id ${id}:`,
        error.message
      );
      throw new Error(
        `Unable to assign contact number to grievance with id ${id}`
      );
    }
  }

  static async updateStatus(id, status) {
    try {
      // Update the status field for the specified grievance ID
      const updatedGrievance = await prisma.grievance.update({
        where: { id: id },
        data: { status: status },
      });

      return updatedGrievance;
    } catch (error) {
      console.error(
        `Error updating status of grievance with id ${id}:`,
        error.message
      );
      throw new Error(`Unable to update status of grievance with id ${id}`);
    }
  }
}

module.exports = Grievance;
