const schedule = require("node-schedule");

const User = require("../models/user");
const admin = require("../config/firebase");

async function scheduleNotification(
  mobileNumber,
  eventId,
  eventTitle,
  eventDate,
  eventTime
) {
  try {
    // Find the user by mobile number
    const user = await User.findByMobileNumber(mobileNumber);
    if (!user || !user.fcmToken) {
      console.log(`No FCM token found for user ${mobileNumber}`);
      return;
    }

    // Parse the time (HH:mm) and combine it with the date
    const [hours, minutes] = eventTime.split(":");
    const scheduledTime = new Date(eventDate);
    scheduledTime.setUTCHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

    // Schedule the notification
    schedule.scheduleJob(scheduledTime, async function () {
      try {
        await admin.messaging().send({
          token: user.fcmToken,
          notification: {
            title: "Event Reminder",
            body: `Your event "${eventTitle}" is starting now!`,
          },
          data: {
            eventId: eventId,
          },
        });
        console.log(
          `Notification sent to user ${user._id} for event ${eventId}`
        );
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    console.log(
      `Notification scheduled for user ${user._id} at ${scheduledTime}`
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
}

module.exports = scheduleNotification;
