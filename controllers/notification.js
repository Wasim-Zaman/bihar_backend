const { PrismaClient } = require("@prisma/client");
const schedule = require("node-schedule");

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

// async function scheduleNotification(notification) {
//   const { title, description, date, time, timezone } = notification;

//   try {
//     // Combine date and time into a single string
//     const scheduledDateTimeString = `${date} ${time}`;

//     // Convert the scheduled date and time from the specified timezone to UTC
//     const scheduledDateTime = moment
//       .tz(scheduledDateTimeString, "YYYY-MM-DD HH:mm", timezone)
//       .utc();

//     // Retrieve FCM tokens from both User and EpicUser tables
//     const userTokens = await prisma.user.findMany({
//       select: { fcmToken: true },
//     });

//     const epicUserTokens = await prisma.epicUser.findMany({
//       select: { fcmToken: true },
//     });

//     // Combine the tokens into a single array
//     const allTokens = [...userTokens, ...epicUserTokens].map(
//       (user) => user.fcmToken
//     );

//     console.log("FCM Tokens:", allTokens);

//     const message = {
//       notification: {
//         title,
//         body: description,
//       },
//       tokens: allTokens, // Send to all users' tokens
//     };

//     // Schedule the notification using node-schedule at the specified time
//     const now = moment.utc(); // Current time in UTC
//     const delay = scheduledDateTime.diff(now, "seconds");

//     if (delay > 0) {
//       console.log(
//         `Notification will be sent after ${Math.floor(
//           delay / 3600
//         )} hours, ${Math.floor((delay % 3600) / 60)} minutes, and ${Math.floor(
//           delay % 60
//         )} seconds`
//       );

//       schedule.scheduleJob(scheduledDateTime.toDate(), async () => {
//         try {
//           const response = await messaging.sendMulticast(message);
//           console.log("Notifications sent successfully:", response);
//         } catch (error) {
//           console.error("Error sending notifications:", error.message);
//         }
//       });
//     } else {
//       console.error("Scheduled time is in the past. Notification not sent.");
//     }
//   } catch (error) {
//     console.error("Error scheduling notification:", error.message);
//   }
// }

async function scheduleNotification(notification) {
  try {
    const { time, date, timezone, title, description } = notification;
    // Combine the event date and fromTime in UTC, then convert to the admin's timezone
    const eventDateTimeUTC = moment.utc(date).format("YYYY-MM-DD") + ` ${time}`;
    const notificationTime = moment.tz(
      eventDateTimeUTC,
      "YYYY-MM-DD HH:mm",
      timezone
    );

    // If the notification time is in the past, skip scheduling
    if (moment().isAfter(notificationTime)) {
      console.log("Notification time is in the past, skipping notification.");
      return;
    }

    console.log("Admin Timezone:", timezone);
    console.log(
      "Notification Time (in admin's timezone):",
      notificationTime.format("YYYY-MM-DD HH:mm:ss")
    );

    // Schedule the notification using node-schedule based on the user's local time
    schedule.scheduleJob(notificationTime.toDate(), async () => {
      try {
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

        const message = {
          notification: {
            title,
            body: description,
          },
          tokens: allTokens,
        };
        const response = await messaging.sendMulticast(message);
        console.log("Notifications sent successfully:", response);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    console.log(
      `Notification scheduled for ${notificationTime.format(
        "YYYY-MM-DD HH:mm:ss"
      )} in the admin's timezone.`
    );
  } catch (error) {
    console.error("Error in scheduleNotification:", error);
  }
}
