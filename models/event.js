const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Event {
  static async findById(id) {
    try {
      return await prisma.event.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding event by id:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating event with data: ${JSON.stringify(data)}`);
      return await prisma.event.create({
        data,
      });
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating event with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.event.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error(`Error updating event with id ${id}:`, error.message);
      throw new Error(`Unable to update event with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting event with ID ${id}`);
      return await prisma.event.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting event by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.event.findMany();
    } catch (error) {
      console.error("Error finding all events:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      const where = query
        ? {
            OR: [
              { eventTitle: { contains: query } },
              { constituency: { contains: query } },
              { mobileNumber: { contains: query } },
            ],
          }
        : {};

      const events = await prisma.event.findMany({
        skip,
        take: limit,
        where,
      });

      const totalEvents = await prisma.event.count({ where });

      const totalPages = Math.ceil(totalEvents / limit);

      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting events with pagination and search:", error);
      throw error;
    }
  }

  static async getUserEvents(
    mobileNumber,
    page = 1,
    limit = 10,
    query = "",
    tab
  ) {
    try {
      const skip = (page - 1) * limit;

      // Build the search condition based on mobile number, isAdmin, and optional query
      const where = {
        OR: [
          { mobileNumber: mobileNumber },
          { mobileNumber: null },
          { owner: "admin" },
        ],
        ...(query && {
          AND: [
            {
              OR: [
                { eventTitle: { contains: query } },
                { constituency: { contains: query } },
              ],
            },
          ],
        }),
        // Add filter based on the tab value
        ...(tab === "onGoing"
          ? { status: 0 }
          : tab === "history"
          ? { status: { in: [1, 2, 3] } }
          : {}),
      };

      // Fetch the paginated events
      const events = await prisma.event.findMany({
        skip,
        take: limit,
        where,
      });

      // Count the total number of events matching the criteria
      const totalEvents = await prisma.event.count({ where });

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalEvents / limit);

      // Return the data and pagination details
      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting events by mobile number, isAdmin, or mobile number null with pagination, search, and tab filter:",
        error
      );
      throw error;
    }
  }

  // Function to update status based on mobileNumber
  static async updateStatus(id, status) {
    try {
      return await prisma.event.update({
        where: { id: id },
        data: { status: status },
      });
    } catch (error) {
      console.error(
        `Error updating status for mobile number ${mobileNumber}:`,
        error.message
      );
      throw new Error(
        `Unable to update status for mobile number ${mobileNumber}`
      );
    }
  }

  // New method to get events by mobile number with status 2
  static async getByMobileNumberWithStatus2(mobileNumber) {
    try {
      return await prisma.event.findMany({
        where: {
          mobileNumber: mobileNumber,
          status: 2,
        },
      });
    } catch (error) {
      console.error(
        `Error finding events for mobile number ${mobileNumber} with status 2:`,
        error.message
      );
      throw new Error(
        `Unable to find events for mobile number ${mobileNumber} with status 2`
      );
    }
  }

  static async getEventsByDate(mobileNumber, date, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Parse the provided date and normalize it to remove time components
      const searchDate = new Date(date);
      searchDate.setUTCHours(0, 0, 0, 0);

      // Calculate the start and end of the day for filtering events
      const startOfDay = new Date(searchDate);
      const endOfDay = new Date(searchDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Fetch paginated events from the database
      const events = await prisma.event.findMany({
        skip,
        take: limit,
        where: {
          OR: [
            { mobileNumber: mobileNumber },
            { mobileNumber: null },
            { owner: "admin" },
          ],
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
          status: {
            not: 1,
          },
        },
      });

      // Count the total number of events matching the criteria
      const totalEvents = await prisma.event.count({
        where: {
          OR: [
            { mobileNumber: mobileNumber },
            { owner: "admin" }, // Replaced isAdmin with owner: "admin"
            { mobileNumber: null },
          ],
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalEvents / limit);

      // Return the data and pagination details
      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        `Error getting events by date for mobile number ${mobileNumber}:`,
        error.message
      );
      throw new Error(
        `Unable to get events by date for mobile number ${mobileNumber}`
      );
    }
  }

  static async getAdminSideRequestedEvents(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch paginated events from the database
      const events = await prisma.event.findMany({
        skip,
        take: limit,
        where: {
          NOT: { owner: "admin" },
        },
      });

      // Count the total number of events matching the criteria
      const totalEvents = await prisma.event.count({
        where: {
          NOT: { owner: "admin" },
        },
      });

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalEvents / limit);

      // Return the data and pagination details
      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(`Unable to get events ${mobileNumber}`);
    }
  }

  static async getAdminSideEventsList(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch paginated events from the database
      const events = await prisma.event.findMany({
        skip,
        take: limit,
      });

      // Count the total number of events matching the criteria
      const totalEvents = await prisma.event.count({});

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalEvents / limit);

      // Return the data and pagination details
      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(`Unable to get events ${mobileNumber}`);
    }
  }

  static async getAdminSideEventsListAccepted(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      // Fetch paginated events from the database where status is 0
      const events = await prisma.event.findMany({
        where: {
          status: 0, // Filter events where status is 0
        },
        skip,
        take: limit,
      });

      // Count the total number of events matching the criteria where status is 0
      const totalEvents = await prisma.event.count({
        where: {
          status: 0, // Count only events where status is 0
        },
      });

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalEvents / limit);

      // Return the data and pagination details
      return {
        data: events,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEvents,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw new Error(`Unable to get events where status is 0`);
    }
  }
}

module.exports = Event;
