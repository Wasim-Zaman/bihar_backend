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
  const user = await User.findByMobileNumber(mobileNumber);
  if (!user || !user.fcmToken) {
    console.log(`No FCM token found for user ${mobileNumber}`);
    return;
  }

  const [hours, minutes] = eventTime.split(":");
  const scheduledTime = new Date(eventDate);
  scheduledTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

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
      console.log(`Notification sent to user ${userId} for event ${eventId}`);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
}

module.exports = scheduleNotification;
