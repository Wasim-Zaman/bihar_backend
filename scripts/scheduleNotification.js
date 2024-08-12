const schedule = require("node-schedule");
const moment = require("moment-timezone");

const User = require("../models/user");
const messaging = require("../config/firebase"); // Adjust to the correct path

async function scheduleNotification(
  mobileNumber,
  eventId,
  eventTitle,
  eventDateTime, // This will be the full ISO date string
  eventTime // This will be the time string e.g., "11:42"
) {
  try {
    const user = await User.findByMobileNumber(mobileNumber);
    if (!user || !user.fcmToken) {
      console.log(`No FCM token found for user ${mobileNumber}`);
      return;
    }

    console.log(user);

    // Parse the incoming ISO string into a moment object
    const eventDate = moment(eventDateTime);

    // Extract the hours and minutes from the eventTime string
    const [hours, minutes] = eventTime.split(":");

    // Set the time for the eventDate object
    eventDate.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) });

    // Subtract 10 minutes for the notification
    const scheduledTime = eventDate.subtract(10, "minutes");

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
