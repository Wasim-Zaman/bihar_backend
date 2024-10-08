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
 *   name: Events
 *   description: Event management
 */

/**
 * @swagger
 * /api/events/v1/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - date
 *               - fromTime
 *               - toTime
 *               - constituency
 *               - boothNumber
 *               - mobileNumber
 *               - status
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: integer
 *               mobileNumber:
 *                 type: string
 *               status:
 *                 type: integer
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: All required fields must be provided
 *       401:
 *         description: Unauthorized access, please enter correct mobile number
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v2/events:
 *   post:
 *     summary: Create a new event (version 2)
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - date
 *               - fromTime
 *               - toTime
 *               - mobileNumber
 *               - owner
 *               - categoryName
 *               - place
 *               - status
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               owner:
 *                 type: string
 *                 enum: [user, epic user]
 *               categoryName:
 *                 type: string
 *               place:
 *                 type: string
 *               status:
 *                 type: integer
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: All required fields must be provided or invalid date
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v3/events:
 *   post:
 *     summary: Create a new event (version 3)
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - date
 *               - fromTime
 *               - toTime
 *               - mobileNumber
 *               - owner
 *               - categoryName
 *               - place
 *               - status
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               owner:
 *                 type: string
 *                 enum: [user, epic user]
 *               categoryName:
 *                 type: string
 *               place:
 *                 type: string
 *               status:
 *                 type: integer
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: All required fields must be provided or invalid date/time
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/adminEvent:
 *   post:
 *     summary: Create a new event by an admin
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - eventTitle
 *               - date
 *               - fromTime
 *               - toTime
 *               - status
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               place:
 *                 type: string
 *               status:
 *                 type: integer
 *                 enum: [0, 1, 2, 3]
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: All required fields must be provided or invalid status
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events:
 *   get:
 *     summary: Retrieve paginated events with optional search query
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       404:
 *         description: No events found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: integer
 *               status:
 *                 type: integer
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v2/events/{id}:
 *   put:
 *     summary: Update an event by ID (version 2)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               fromTime:
 *                 type: string
 *               toTime:
 *                 type: string
 *               constituency:
 *                 type: string
 *               boothNumber:
 *                 type: integer
 *               categoryName:
 *                 type: string
 *               place:
 *                 type: string
 *               status:
 *                 type: integer
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/status/{id}:
 *   patch:
 *     summary: Update event status
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event status updated successfully
 *       404:
 *         description: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/user-events:
 *   get:
 *     summary: Get events by user's mobile number
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 20
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *       - in: query
 *         name: tab
 *         schema:
 *           type: string
 *           enum: [onGoing, history]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       404:
 *         description: No events found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin-events:
 *   get:
 *     summary: Get admin side events by date
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 20
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       400:
 *         description: Date must be provided
 *       404:
 *         description: No events found for the given date
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin-requested-events:
 *   get:
 *     summary: Get admin side requested events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 20
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       404:
 *         description: No events found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin-events-list:
 *   get:
 *     summary: Get admin side events list
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 20
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       404:
 *         description: No events found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin-events-list-accepted:
 *   get:
 *     summary: Get admin side events list (accepted)
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 20
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       404:
 *         description: No events found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/send-notification:
 *   post:
 *     summary: Send a notification (test endpoint)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Notification sent
 *     security:
 *       - bearerAuth: []
 */
