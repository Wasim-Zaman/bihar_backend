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
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 example: "Meeting"
 *                 description: The title of the event
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-26T12:42:00Z"
 *                 description: The date and time of the event
 *               constituency:
 *                 type: string
 *                 example: "Samastipur"
 *                 description: The constituency of the event
 *               boothNumber:
 *                 type: integer
 *                 example: 52
 *                 description: The booth number of the event
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: The mobile number associated with the event
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: Attachment file (e.g., doc, pdf, jpg)
 *     responses:
 *       201:
 *         description: Event created successfully
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
 *                   example: Event created successfully
 *                 data:
 *                   type: object
 *                   nullable: true
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
 *                   example: Validation error
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
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to retrieve
 *     responses:
 *       200:
 *         description: Event retrieved successfully
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
 *                   example: Event retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     eventTitle:
 *                       type: string
 *                       example: "Meeting"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T12:42:00Z"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     document:
 *                       type: string
 *                       example: "https://example.com/document.pdf"
 *                     status:
 *                       type: integer
 *                       example: 0
 *                       description: Status of the event (0, 1, 2)
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Event not found
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
 *                   example: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/all:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
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
 *                   example: Events retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       eventTitle:
 *                         type: string
 *                         example: "Meeting"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-26T12:42:00Z"
 *                       constituency:
 *                         type: string
 *                         example: "Samastipur"
 *                       boothNumber:
 *                         type: integer
 *                         example: 52
 *                       mobileNumber:
 *                         type: string
 *                         example: "1234567890"
 *                       document:
 *                         type: string
 *                         example: "https://example.com/document.pdf"
 *                       status:
 *                         type: integer
 *                         example: 0
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No events found
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
 *                   example: No events found
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
 *         description: The search query to filter events.
 *     responses:
 *       200:
 *         description: Events retrieved successfully
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
 *                   example: Events retrieved successfully
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
 *                     events:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           eventTitle:
 *                             type: string
 *                             example: "Meeting"
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-03-26T12:42:00Z"
 *                           constituency:
 *                             type: string
 *                             example: "Samastipur"
 *                           boothNumber:
 *                             type: integer
 *                             example: 52
 *                           mobileNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           document:
 *                             type: string
 *                             example: "https://example.com/document.pdf"
 *                           status:
 *                             type: integer
 *                             example: 0
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No events found
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
 *                   example: No events found
 */

/**
 * @swagger
 * /api/events/v1/events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 description: The title of the event
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the event
 *               constituency:
 *                 type: string
 *                 description: The constituency of the event
 *               boothNumber:
 *                 type: integer
 *                 description: The booth number of the event
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The new document file (e.g., doc, pdf, jpg)
 *     responses:
 *       200:
 *         description: Event updated successfully
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
 *                   example: Event updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     eventTitle:
 *                       type: string
 *                       example: "Meeting"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T12:42:00Z"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     document:
 *                       type: string
 *                       example: "https://example.com/new-document.pdf"
 *                     status:
 *                       type: integer
 *                       example: 0
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Event not found
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
 *                   example: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
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
 *                   example: Event deleted successfully
 *       404:
 *         description: Event not found
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
 *                   example: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/status/{id}:
 *   patch:
 *     summary: Update the status of an event based on mobile number
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID associated with the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 example: 1
 *                 description: The status to be updated (0, 1, 2)
 *     responses:
 *       200:
 *         description: Event status updated successfully
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
 *                   example: Event status updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     eventTitle:
 *                       type: string
 *                       example: "Meeting"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T12:42:00Z"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Event not found
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
 *                   example: Event not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/events/status2/{mobileNumber}:
 *   get:
 *     summary: Retrieve events by mobile number with status 2
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: mobileNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: The mobile number associated with the events
 *     responses:
 *       200:
 *         description: Events retrieved successfully
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
 *                   example: Events retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       eventTitle:
 *                         type: string
 *                         example: "Meeting"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-26T12:42:00Z"
 *                       constituency:
 *                         type: string
 *                         example: "Samastipur"
 *                       boothNumber:
 *                         type: integer
 *                         example: 52
 *                       mobileNumber:
 *                         type: string
 *                         example: "1234567890"
 *                       status:
 *                         type: integer
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No events found with status 2
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
 *                   example: No events found with status 2
 *     security:
 *       - bearerAuth: []
 */
