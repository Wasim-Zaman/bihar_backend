const messaging = require("../config/firebase");

/**
 * Sends a notification to a specific user based on the FCM token.
 * @param {string} fcmToken - The FCM token of the target device.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body of the notification.
 * @param {object} [data] - Optional data to send along with the notification.
 * @returns {Promise<void>} - Resolves when the notification is successfully sent.
 */
async function sendNotification(fcmToken, title, body, data = {}) {
  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    data, // Optional data payload
  };

  try {
    const response = await messaging.send(message);
    console.log("Successfully sent notification:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}

module.exports = {
  sendNotification,
};
