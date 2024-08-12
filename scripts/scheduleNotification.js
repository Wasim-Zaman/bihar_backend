const schedule = require("node-schedule");
const moment = require("moment-timezone");

const User = require("../models/user");
const messaging = require("../config/firebase"); // Adjust to the correct path

async function scheduleNotification(
  mobileNumber,
  eventId,
  eventTitle,
  eventDate,
  eventTime
) {
  try {
    const user = await User.findByMobileNumber(mobileNumber);
    if (!user || !user.fcmToken) {
      console.log(`No FCM token found for user ${mobileNumber}`);
      return;
    }

    console.log(user);

    // Convert eventDate and eventTime from PST to UTC
    const eventDateTimePST = `${eventDate} ${eventTime}`;
    const scheduledTime = moment.tz(eventDateTimePST, "Asia/Karachi").utc();

    // Subtract 10 minutes for the notification
    scheduledTime.subtract(10, "minutes");

    schedule.scheduleJob(scheduledTime.toDate(), async function () {
      try {
        console.log(messaging);
        await messaging.send({
          token: user.fcmToken,
          notification: {
            title: "Event Reminder",
            body: `Your event "${eventTitle}" is starting in 10 minutes!`,
          },
          data: {
            eventId: eventId,
          },
        });
        console.log(
          `Notification sent to user ${user.id} for event ${eventId}`
        );
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    console.log(
      `Notification scheduled for user ${user.id} at ${scheduledTime.toDate()}`
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
}

module.exports = scheduleNotification;
