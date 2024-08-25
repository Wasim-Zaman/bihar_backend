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
 *                 format: date
 *                 example: "2024-03-26"
 *                 description: The date of the event
 *               fromTime:
 *                 type: string
 *                 example: "13:23"
 *                 description: The start time of the event
 *               toTime:
 *                 type: string
 *                 example: "15:00"
 *                 description: The end time of the event
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
 *               status:
 *                 type: integer
 *                 example: 1
 *                 description: The status of the event (0, 1, 2)
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
 * /api/events/v2/events:
 *   post:
 *     summary: Create a new event with multiple documents
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
 *               - status
 *             properties:
 *               eventTitle:
 *                 type: string
 *                 example: "Meeting"
 *                 description: The title of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-26"
 *                 description: The date of the event (in UTC)
 *               fromTime:
 *                 type: string
 *                 example: "13:23"
 *                 description: The start time of the event
 *               toTime:
 *                 type: string
 *                 example: "15:00"
 *                 description: The end time of the event
 *               constituency:
 *                 type: string
 *                 example: "Samastipur"
 *                 description: The constituency of the event. Defaults to the user's legislative constituency if not provided.
 *               boothNumber:
 *                 type: integer
 *                 example: 52
 *                 description: The booth number of the event. Defaults to the user's booth name or number if not provided.
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: The mobile number associated with the event. Must match the user's mobile number for authorization.
 *               owner:
 *                 type: string
 *                 example: "User"
 *                 description: The owner of the event. Must be 'user' or 'epic user'.
 *               status:
 *                 type: integer
 *                 example: 1
 *                 description: The status of the event (0, 1, 2, or 3)
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files (e.g., doc, pdf, jpg)
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid-1234-5678-91011"
 *                     eventTitle:
 *                       type: string
 *                       example: "Meeting"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T13:23:00Z"
 *                     fromTime:
 *                       type: string
 *                       example: "13:23"
 *                     toTime:
 *                       type: string
 *                       example: "15:00"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     owner:
 *                       type: string
 *                       example: "user"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/document1.pdf"
 *       400:
 *         description: Validation error or missing required fields
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
 *                   example: All required fields must be provided
 *       401:
 *         description: Unauthorized access
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
 *                   example: Unauthorized access, please enter correct mobile number
 *       404:
 *         description: User not found
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
 *                   example: User not found with the entered mobile number
 *       403:
 *         description: Unauthorized owner type
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
 *                   example: Unauthorized access, you are not the User or an Epic User
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/adminEvent:
 *   post:
 *     summary: Create a new event with multiple documents by an admin
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
 *                 example: "Meeting"
 *                 description: The title of the event
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-26"
 *                 description: The date of the event (in UTC)
 *               fromTime:
 *                 type: string
 *                 example: "13:23"
 *                 description: The start time of the event
 *               toTime:
 *                 type: string
 *                 example: "15:00"
 *                 description: The end time of the event
 *               constituency:
 *                 type: string
 *                 example: "Samastipur"
 *                 description: The constituency of the event (optional)
 *               boothNumber:
 *                 type: integer
 *                 example: 52
 *                 description: The booth number of the event (optional)
 *               status:
 *                 type: integer
 *                 example: 1
 *                 description: The status of the event (0, 1, 2, 3)
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files (e.g., doc, pdf, jpg)
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid-1234-5678-91011"
 *                     eventTitle:
 *                       type: string
 *                       example: "Meeting"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-26T13:23:00Z"
 *                     fromTime:
 *                       type: string
 *                       example: "13:23"
 *                     toTime:
 *                       type: string
 *                       example: "15:00"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/document1.pdf"
 *       400:
 *         description: Validation error or missing required fields
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
 *                   example: All required fields must be provided or Invalid status provided, it must be one of these [0,1,2,3]
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
 *                 format: date
 *                 description: The date of the event
 *               fromTime:
 *                 type: string
 *                 description: The start time of the event (e.g., "14:00")
 *               toTime:
 *                 type: string
 *                 description: The end time of the event (e.g., "16:00")
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
 *               status:
 *                 type: integer
 *                 description: The status of the event (0, 1, 2)
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
 *                     fromTime:
 *                       type: string
 *                       example: "14:00"
 *                     toTime:
 *                       type: string
 *                       example: "16:00"
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
 * /api/events/v2/events/{id}:
 *   put:
 *     summary: Update an event with multiple documents
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
 *                 format: date
 *                 description: The date of the event
 *               fromTime:
 *                 type: string
 *                 description: The start time of the event (e.g., "14:00")
 *               toTime:
 *                 type: string
 *                 description: The end time of the event (e.g., "16:00")
 *               constituency:
 *                 type: string
 *                 description: The constituency of the event
 *               boothNumber:
 *                 type: integer
 *                 description: The booth number of the event
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of new document files (e.g., doc, pdf, jpg)
 *               status:
 *                 type: integer
 *                 description: The status of the event (0, 1, 2)
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
 *                     fromTime:
 *                       type: string
 *                       example: "14:00"
 *                     toTime:
 *                       type: string
 *                       example: "16:00"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/document1.pdf"
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
 * /api/events/v2/adminEvent/{id}:
 *   put:
 *     summary: Update an event with multiple documents
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
 *                 format: date
 *                 description: The date of the event
 *               fromTime:
 *                 type: string
 *                 description: The start time of the event (e.g., "14:00")
 *               toTime:
 *                 type: string
 *                 description: The end time of the event (e.g., "16:00")
 *               constituency:
 *                 type: string
 *                 description: The constituency of the event
 *               boothNumber:
 *                 type: integer
 *                 description: The booth number of the event
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of new document files (e.g., doc, pdf, jpg)
 *               status:
 *                 type: integer
 *                 description: The status of the event (0, 1, 2)
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
 *                     fromTime:
 *                       type: string
 *                       example: "14:00"
 *                     toTime:
 *                       type: string
 *                       example: "16:00"
 *                     constituency:
 *                       type: string
 *                       example: "Samastipur"
 *                     boothNumber:
 *                       type: integer
 *                       example: 52
 *                     mobileNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/document1.pdf"
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
 *     summary: Update the status of an event based on the event ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID associated with the event
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
 */

/**
 * @swagger
 * /api/events/v1/user-events:
 *   get:
 *     summary: Retrieve paginated events by mobile number with optional search query and tab filtering
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *         example: 20
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter events.
 *         example: "Meeting"
 *       - in: query
 *         name: tab
 *         schema:
 *           type: string
 *         description: The tab to filter events. Must be 'onGoing' or 'history'.
 *         example: "onGoing"
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
 *                           status:
 *                             type: integer
 *                             example: 2
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       400:
 *         description: Invalid tab value or bad request
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
 *                   example: "Invalid tab value. Must be 'onGoing' or 'history'."
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
 *       500:
 *         description: Server error
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
 *                   example: "Server error occurred"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/date-events:
 *   get:
 *     summary: Retrieve paginated events by date and mobile number
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items to retrieve per page.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           description: The date to filter events.
 *         required: true
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
 *                       example: 100
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
 *                           time:
 *                             type: string
 *                             example: "14:30"
 *                           constituency:
 *                             type: string
 *                             example: "Samastipur"
 *                           boothNumber:
 *                             type: integer
 *                             example: 52
 *                           mobileNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           status:
 *                             type: integer
 *                             example: 2
 *                           document:
 *                             type: string
 *                             example: "https://example.com/document.pdf"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       400:
 *         description: Date must be provided
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
 *                   example: Date must be provided
 *       404:
 *         description: No events found for the given date
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
 *                   example: No events found for the given date
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin/requested:
 *   get:
 *     summary: Retrieve requested events for admin
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items to retrieve per page.
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
 *                           mobileNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           owner:
 *                             type: string
 *                             example: "admin"
 *                           status:
 *                             type: integer
 *                             example: 1
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
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin/list:
 *   get:
 *     summary: Retrieve a list of events for admin
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items to retrieve per page.
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
 *                           mobileNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           status:
 *                             type: integer
 *                             example: 1
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
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/events/v1/admin/list/accepted:
 *   get:
 *     summary: Retrieve a list of accepted events
 *     description: This endpoint retrieves a paginated list of events that have been accepted (status is 0) for the admin side.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (pagination).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items per page (pagination).
 *     responses:
 *       200:
 *         description: A list of accepted events along with pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique identifier of the event.
 *                       title:
 *                         type: string
 *                         description: The title of the event.
 *                       description:
 *                         type: string
 *                         description: The description of the event.
 *                       status:
 *                         type: integer
 *                         description: The status of the event (0 for accepted).
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the event.
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the event.
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number.
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages.
 *                     totalItems:
 *                       type: integer
 *                       description: The total number of items.
 *                     itemsPerPage:
 *                       type: integer
 *                       description: The number of items per page.
 *       404:
 *         description: No events found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: The status code.
 *                 message:
 *                   type: string
 *                   description: The error message.
 *     security:
 *       - bearerAuth: []
 */
