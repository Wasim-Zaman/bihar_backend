/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/notifications/v1/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "System Maintenance"
 *                 description: The title of the notification
 *               description:
 *                 type: string
 *                 example: "The system will undergo maintenance at 2:00 AM UTC."
 *                 description: The content of the notification
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-26T02:00:00Z"
 *                 description: The date and time in UTC ISO format when the notification should be sent
 *               time:
 *                 type: string
 *                 example: "09:05"
 *                 description: The time the notification should be sent (in the admin's timezone)
 *               timezone:
 *                 type: string
 *                 example: "Asia/Karachi"
 *                 description: The timezone of the admin creating the notification (IANA timezone format)
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Notification created and scheduled successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid-1234-5678-91011"
 *                     title:
 *                       type: string
 *                       example: "System Maintenance"
 *                     description:
 *                       type: string
 *                       example: "The system will undergo maintenance at 2:00 AM UTC."
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T02:00:00Z"
 *                     time:
 *                       type: string
 *                       example: "09:05"
 *                     timezone:
 *                       type: string
 *                       example: "Asia/Karachi"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/notifications/v1/notifications:
 *   get:
 *     summary: Retrieve all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notifications retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       title:
 *                         type: string
 *                         example: "System Maintenance"
 *                       description:
 *                         type: string
 *                         example: "The system will undergo maintenance at 2:00 AM UTC."
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-26T02:00:00Z"
 *                       time:
 *                         type: string
 *                         example: "02:00"
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No notifications found
 */

/**
 * @swagger
 * /api/notifications/v1/notifications/{id}:
 *   get:
 *     summary: Retrieve a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to retrieve
 *     responses:
 *       200:
 *         description: Notification retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     title:
 *                       type: string
 *                       example: "System Maintenance"
 *                     description:
 *                       type: string
 *                       example: "The system will undergo maintenance at 2:00 AM UTC."
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T02:00:00Z"
 *                     time:
 *                       type: string
 *                       example: "02:00"
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Notification not found
 */

/**
 * @swagger
 * /api/notifications/v1/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to delete
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notification deleted successfully
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Notification not found
 */

/**
 * @swagger
 * /api/notifications/v1/notifications:
 *   get:
 *     summary: Retrieve paginated notifications with optional search query
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter notifications.
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Notifications retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     totalItems:
 *                       type: integer
 *                       example: 50
 *                     notifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           title:
 *                             type: string
 *                             example: "System Maintenance"
 *                           description:
 *                             type: string
 *                             example: "The system will undergo maintenance at 2:00 AM UTC."
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-26T02:00:00Z"
 *                           time:
 *                             type: string
 *                             example: "02:00"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No notifications found
 */
