const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EpicUser {
  static async findById(id) {
    try {
      return await prisma.epicUser.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding EpicUser by id:", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await prisma.epicUser.findUnique({
        where: { email: email },
      });
    } catch (error) {
      console.error("Error finding EpicUser by email:", error);
      throw error;
    }
  }

  static async findByMobileNumber(mobileNumber) {
    try {
      return await prisma.epicUser.findUnique({
        where: { mobileNumber: mobileNumber },
      });
    } catch (error) {
      console.error("Error finding EpicUser by mobile number:", error);
      throw error;
    }
  }

  static async findByFcmToken(fcmToken) {
    try {
      return await prisma.epicUser.findUnique({
        where: { fcmToken: fcmToken },
      });
    } catch (error) {
      console.error("Error finding EpicUser by FCM token:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating EpicUser with data: ${JSON.stringify(data)}`);
      return await prisma.epicUser.create({
        data,
      });
    } catch (error) {
      console.error("Error creating EpicUser:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      return await prisma.epicUser.update({
        where: { id: id.toString() },
        data,
      });
    } catch (error) {
      console.error(`Error updating EpicUser with id ${id}:`, error.message);
      throw new Error(`Unable to update EpicUser with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting EpicUser with ID ${id}`);
      return await prisma.epicUser.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting EpicUser by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.epicUser.findMany();
    } catch (error) {
      console.error("Error finding all EpicUsers:", error);
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
              { email: { contains: query } },
              { mobileNumber: { contains: query } },
            ],
          }
        : {};

      // Fetch the paginated users
      const users = await prisma.user.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of users
      const totalUsers = await prisma.user.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalUsers / limit);

      return {
        users: users,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalUsers,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting users with pagination and search:", error);
      throw error;
    }
  }

  static async login(mobileNumber, fcmToken, epicId) {
    try {
      let user = await this.findByMobileNumber(mobileNumber);

      if (!user) {
        user = await this.create({ mobileNumber, fcmToken, epicId });
        console.log(`Created new EpicUser with mobile number: ${mobileNumber}`);
      } else {
        console.log(
          `EpicUser with mobile number: ${mobileNumber} already exists`
        );
      }

      return user;
    } catch (error) {
      console.error("Error during login process:", error);
      throw error;
    }
  }
}

module.exports = EpicUser;
