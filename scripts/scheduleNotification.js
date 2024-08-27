const moment = require("moment-timezone");
const schedule = require("node-schedule");
const messaging = require("../config/firebase");

async function scheduleNotification(newEvent, user) {
  try {
    // Combine the event date and fromTime in UTC, then convert to the user's timezone
    const eventDateTimeUTC =
      moment.utc(newEvent.date).format("YYYY-MM-DD") + ` ${newEvent.fromTime}`;
    const notificationTime = moment
      .tz(eventDateTimeUTC, "YYYY-MM-DD HH:mm", user.timeZone)
      .subtract(10, "minutes");

    // If the notification time is in the past, skip scheduling
    if (moment().isAfter(notificationTime)) {
      console.log("Notification time is in the past, skipping notification.");
      return;
    }

    console.log("User Timezone:", user.timeZone);
    console.log(
      "Notification Time (in user's timezone):",
      notificationTime.format("YYYY-MM-DD HH:mm:ss")
    );

    // Schedule the notification using node-schedule based on the user's local time
    schedule.scheduleJob(notificationTime.toDate(), async () => {
      try {
        const payload = {
          notification: {
            title: "Meeting Reminder",
            body: `Your meeting for "${newEvent.eventTitle}" is about to start at ${newEvent.fromTime}.`,
          },
          token: user.fcmToken,
        };

        console.log("Payload to be sent:", payload);

        const response = await messaging.send(payload);
        console.log("Notification sent successfully:", response);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    console.log(
      `Notification scheduled for ${notificationTime.format(
        "YYYY-MM-DD HH:mm:ss"
      )} in the user's timezone.`
    );
  } catch (error) {
    console.error("Error in scheduleNotification:", error);
  }
}

module.exports = scheduleNotification;
