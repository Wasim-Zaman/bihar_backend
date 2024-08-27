const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Notification {
  static async findById(id) {
    try {
      return await prisma.notification.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding notification by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating notification with data: ${JSON.stringify(data)}`);
      return await prisma.notification.create({
        data,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.notification.findMany();
    } catch (error) {
      console.error("Error finding all notifications:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting notification with ID ${id}`);
      return await prisma.notification.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting notification by id:", error);
      throw error;
    }
  }

  static async get(userId, page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      const where = {
        AND: [
          {
            OR: [{ userId: userId }, { userId: null }],
          },
          query
            ? {
                OR: [
                  { title: { contains: query } },
                  { description: { contains: query } },
                ],
              }
            : {},
        ],
      };

      const notifications = await prisma.notification.findMany({
        skip,
        take: limit,
        where,
      });

      const totalNotifications = await prisma.notification.count({ where });

      const totalPages = Math.ceil(totalNotifications / limit);

      return {
        data: notifications,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalNotifications,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting notifications with pagination, search, and user filter:",
        error
      );
      throw error;
    }
  }
}

module.exports = Notification;
