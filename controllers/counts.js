const { PrismaClient } = require("@prisma/client");

const response = require("../utils/response");

const prisma = new PrismaClient();

exports.getAllCounts = async (req, res, next) => {
  try {
    const userCount = await prisma.user.count();
    const grievanceCount = await prisma.grievance.count();
    const eventCount = await prisma.event.count();
    const epicUserCount = await prisma.epicUser.count();
    const constituencyCount = await prisma.constituency.count();
    const boothCount = await prisma.booth.count();
    const adminCount = await prisma.admin.count();

    res.status(200).json(
      response(200, true, "Counts fetched successfully", {
        userCount,
        grievanceCount,
        eventCount,
        epicUserCount,
        constituencyCount,
        boothCount,
        adminCount,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getCountsByStatus = async (req, res, next) => {
  try {
    // Fetch user counts based on status
    const activeUserCount = await prisma.user.count({
      where: { status: 1 },
    });
    const inactiveUserCount = await prisma.user.count({
      where: { status: 0 },
    });

    // Fetch epic user counts based on status
    const activeEpicUserCount = await prisma.epicUser.count({
      where: { status: 1 },
    });
    const inactiveEpicUserCount = await prisma.epicUser.count({
      where: { status: 0 },
    });

    // Fetch grievance counts based on status
    const grievanceStatus0Count = await prisma.grievance.count({
      where: { status: 0 },
    });
    const grievanceStatus1Count = await prisma.grievance.count({
      where: { status: 1 },
    });
    const grievanceStatus2Count = await prisma.grievance.count({
      where: { status: 2 },
    });
    const grievanceStatus3Count = await prisma.grievance.count({
      where: { status: 3 },
    });

    // Fetch event counts based on status
    const eventStatus0Count = await prisma.event.count({
      where: { status: 0 },
    });
    const eventStatus1Count = await prisma.event.count({
      where: { status: 1 },
    });
    const eventStatus2Count = await prisma.event.count({
      where: { status: 2 },
    });
    const eventStatus3Count = await prisma.event.count({
      where: { status: 3 },
    });

    // Return the counts in the response
    res.status(200).json(
      response(200, true, "Counts by status fetched successfully", {
        users: {
          active: activeUserCount,
          inactive: inactiveUserCount,
        },
        epicUsers: {
          active: activeEpicUserCount,
          inactive: inactiveEpicUserCount,
        },
        grievances: {
          accepted: grievanceStatus0Count,
          processing: grievanceStatus1Count,
          completed: grievanceStatus2Count,
          rejected: grievanceStatus3Count,
        },
        events: {
          accepted: eventStatus0Count,
          processing: eventStatus1Count,
          completed: eventStatus2Count,
          rejected: eventStatus3Count,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
