const { PrismaClient } = require("@prisma/client");

const Notification = require("../models/notification");
const messaging = require("../config/firebase");
const moment = require("moment-timezone");
const CustomError = require("../utils/error");

const prisma = new PrismaClient();

exports.createNotification = async (req, res, next) => {
  try {
    const { title, description, date, time, timezone } = req.body;

    if (!title || !description || !date || !time || !timezone) {
      throw new Error(
        "All fields (title, description, date, time, timezone) are required"
      );
    }

    // Assume date is in UTC ISO format from the user side
    const notificationDateUTC = moment.utc(date);

    // Combine the provided UTC date and time in the user's timezone
    const notificationDate = notificationDateUTC
      .tz(timezone)
      .set({
        hour: parseInt(time.split(":")[0], 10),
        minute: parseInt(time.split(":")[1], 10),
        second: 0,
        millisecond: 0,
      })
      .utc()
      .toDate();

    // Create the notification in the database
    const newNotification = await Notification.create({
      title,
      description,
      date: notificationDate, // Store as UTC
      time,
      timezone, // Store the timezone for reference
    });

    console.log("Notification created:", newNotification);

    // Schedule the notification to be sent at the specified date and time
    scheduleNotification(newNotification);

    res.status(201).json({
      success: true,
      message: "Notification created and scheduled successfully",
      data: newNotification,
    });
  } catch (error) {
    console.error("Error in createNotification:", error.message);
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
    console.error("Error in getAllNotifications:", error.message);
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
    console.error("Error in getNotificationById:", error.message);
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
    console.error("Error in deleteNotificationById:", error.message);
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
    console.error("Error in getNotifications:", error.message);
    next(error);
  }
};

async function scheduleNotification(notification) {
  const { title, description, date, time, timezone } = notification;

  try {
    // Combine date and time into a single string
    const scheduledDateTimeString = `${date} ${time}`;

    // Convert the admin's local time to UTC
    const scheduledDateTime = moment
      .tz(scheduledDateTimeString, "YYYY-MM-DD HH:mm", timezone)
      .utc();

    // Retrieve FCM tokens from both User and EpicUser tables
    const userTokens = await prisma.user.findMany({
      select: { fcmToken: true },
    });

    const epicUserTokens = await prisma.epicUser.findMany({
      select: { fcmToken: true },
    });

    // Combine the tokens into a single array
    const allTokens = [...userTokens, ...epicUserTokens].map(
      (user) => user.fcmToken
    );

    console.log(allTokens);

    const message = {
      notification: {
        title,
        body: description,
      },
      tokens: allTokens, // Send to all users' tokens
    };

    // Calculate the delay until the scheduled time in seconds
    const now = moment.utc(); // Current time in UTC
    const delay = scheduledDateTime.diff(now, "seconds");

    if (delay > 0) {
      console.log(
        `Notification will be sent after ${Math.floor(
          delay / 3600
        )} hours, ${Math.floor((delay % 3600) / 60)} minutes, and ${Math.floor(
          delay % 60
        )} seconds`
      );

      setTimeout(() => {
        messaging
          .sendMulticast(message)
          .then((response) => {
            console.log("Notifications sent successfully:", response);
          })
          .catch((error) => {
            console.error("Error sending notifications:", error.message);
          });
      }, delay * 1000);
    } else {
      console.error("Scheduled time is in the past. Notification not sent.");
    }
  } catch (error) {
    console.error("Error scheduling notification:", error.message);
  }
}
