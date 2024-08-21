const { PrismaClient } = require("@prisma/client");

const response = require("../utils/response");

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
