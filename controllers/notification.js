const { PrismaClient } = require("@prisma/client");
const schedule = require("node-schedule");

const Notification = require("../models/notification");
const messaging = require("../config/firebase");
const moment = require("moment-timezone");
const CustomError = require("../utils/error");
const logger = require("../config/logger");

const prisma = new PrismaClient();

exports.createNotification = async (req, res, next) => {
  try {
    const { title, description, date, time, timezone } = req.body;

    if (!title || !description || !date || !time || !timezone) {
      throw new Error(
        "All fields (title, description, date, time, timezone) are required"
      );
    }

    // Combine the provided date and time in the user's timezone
    const notificationDate = moment.tz(
      `${date} ${time}`,
      "YYYY-MM-DD HH:mm",
      timezone
    );

    // Convert the combined date and time to UTC for storage
    const notificationDateUTC = notificationDate.utc().toDate();

    // Create the notification in the database
    const newNotification = await Notification.create({
      title,
      description,
      date: notificationDateUTC, // Store as UTC
      timezone, // Store the timezone for reference
      time,
    });

    logger.info("Notification created:", newNotification);

    // Schedule the notification to be sent at the specified date and time
    scheduleNotification(newNotification);

    res.status(201).json({
      success: true,
      message: "Notification created and scheduled successfully",
      data: newNotification,
    });
  } catch (error) {
    logger.error("Error in createNotification:", error.message);
    next(error);
  }
};

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.getAll();

    if (!notifications.length) {
      throw new Error("No notifications found");
    }

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (error) {
    logger.error("Error in getAllNotifications:", error.message);
    next(error);
  }
};

exports.getNotificationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      throw new Error("Notification not found");
    }

    res.status(200).json({
      success: true,
      message: "Notification retrieved successfully",
      data: notification,
    });
  } catch (error) {
    logger.error("Error in getNotificationById:", error.message);
    next(error);
  }
};

exports.deleteNotificationById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Notification.deleteById(id);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    logger.error("Error in deleteNotificationById:", error.message);
    next(error);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    let id;
    if (req.user) {
      id = req.user.id;
    }

    const notifications = await Notification.get(
      id || null,
      Number(page),
      Number(limit),
      query
    );

    if (!notifications.data.length) {
      throw new CustomError("No notifications found");
    }

    res.status(200).json({
      success: true,
      message: "Notifications retrieved successfully",
      data: notifications.data,
      pagination: notifications.pagination,
    });
  } catch (error) {
    logger.error("Error in getNotifications:", error.message);
    next(error);
  }
};

async function scheduleNotification(notification) {
  try {
    const { time, date, timezone, title, description } = notification;
    const eventDateTimeUTC = moment.utc(date).format("YYYY-MM-DD") + ` ${time}`;
    const notificationTime = moment.tz(
      eventDateTimeUTC,
      "YYYY-MM-DD HH:mm",
      timezone
    );

    if (moment().isAfter(notificationTime)) {
      logger.info("Notification time is in the past, skipping notification.");
      return;
    }

    logger.info("Admin Timezone:", timezone);
    logger.info(
      "Notification Time (in admin's timezone):",
      notificationTime.format("YYYY-MM-DD HH:mm:ss")
    );

    schedule.scheduleJob(notificationTime.toDate(), async () => {
      try {
        const userTokens = await prisma.user.findMany({
          select: { fcmToken: true },
        });

        const epicUserTokens = await prisma.epicUser.findMany({
          select: { fcmToken: true },
        });

        const allTokens = [...userTokens, ...epicUserTokens]
          .map((user) => user.fcmToken)
          .filter(Boolean);

        if (allTokens.length === 0) {
          logger.info("No tokens available, skipping notification.");
          return;
        }

        const message = {
          notification: {
            title,
            body: description,
          },
          tokens: allTokens,
        };

        const response = await messaging.sendMulticast(message);
        logger.info("Notifications sent successfully:", response);
      } catch (error) {
        logger.error("Error sending notification:", error);
      }
    });

    logger.info(
      `Notification scheduled for ${notificationTime.format(
        "YYYY-MM-DD HH:mm:ss"
      )} in the admin's timezone.`
    );
  } catch (error) {
    logger.error("Error in scheduleNotification:", error);
  }
}
