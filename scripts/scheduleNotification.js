const schedule = require("node-schedule");
const moment = require("moment-timezone");

const User = require("../models/user");
const messaging = require("../config/firebase");

async function scheduleNotification(
  mobileNumber,
  eventId,
  eventTitle,
  eventDateTime, // This should be in UTC
  eventTime
) {
  try {
    const user = await User.findByMobileNumber(mobileNumber);
    if (!user || !user.fcmToken) {
      console.log(`No FCM token found for user ${mobileNumber}`);
      return;
    }

    // Parse the incoming UTC date
    const eventDate = moment.utc(eventDateTime);

    // Extract hours and minutes from eventTime
    const [hours, minutes] = eventTime.split(":");

    // Set the time for the eventDate object (still in UTC)
    eventDate.set({ hour: parseInt(hours, 10), minute: parseInt(minutes, 10) });

    // Subtract 10 minutes for the notification (still in UTC)
    const notificationTime = eventDate.subtract(10, "minutes");

    console.log(`Event time (UTC): ${eventDate.format()}`);
    console.log(`Notification time (UTC): ${notificationTime.format()}`);

    // Schedule the job using UTC time
    schedule.scheduleJob(notificationTime.toDate(), async function () {
      try {
        // When this runs, convert to user's local time for the notification message
        const userLocalTime = notificationTime.tz(user.timezone || "UTC");

        await messaging.send({
          token: user.fcmToken,
          notification: {
            title: "Event Reminder",
            body: `Your event "${eventTitle}" is starting in 10 minutes! (${userLocalTime.format(
              "HH:mm"
            )} your time)`,
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
        console.error("Error details:", JSON.stringify(error, null, 2));
      }
    });

    console.log(
      `Notification scheduled for user ${
        user.id
      } at ${notificationTime.format()} UTC`
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }
}

module.exports = scheduleNotification;
