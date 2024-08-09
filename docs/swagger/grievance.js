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
 *   name: Grievances
 *   description: Grievance management
 */

/**
 * @swagger
 * /api/grievances/v1/grievances:
 *   post:
 *     summary: Create a new grievance
 *     tags: [Grievances]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Category Name"
 *                 description: The category of the grievance
 *               subCategory:
 *                 type: string
 *                 example: "Sub Category Name"
 *                 description: The sub-category of the grievance
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The full name of the user registering the grievance
 *               fatherName:
 *                 type: string
 *                 example: "Father Name"
 *                 description: The father's name of the user
 *               legislativeConstituency:
 *                 type: string
 *                 example: "Legislative Constituency"
 *                 description: The legislative constituency
 *               boothNameOrNumber:
 *                 type: string
 *                 example: "Booth Name/Number"
 *                 description: The booth name or number
 *               contactNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: The contact number of the user
 *               gender:
 *                 type: string
 *                 example: "MALE"
 *                 description: The gender of the user (MALE, FEMALE, OTHER)
 *               age:
 *                 type: integer
 *                 example: 30
 *                 description: The age of the user
 *               voterId:
 *                 type: string
 *                 example: "Voter ID"
 *                 description: The voter ID of the user
 *               ticketTitle:
 *                 type: string
 *                 example: "Ticket Title"
 *                 description: The title of the grievance ticket
 *               description:
 *                 type: string
 *                 example: "Grievance Description"
 *                 description: The description of the grievance
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 description: Attachment file (e.g., doc, pdf, jpg)
 *     responses:
 *       201:
 *         description: Grievance created successfully
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
 *                   example: Grievance created successfully
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
 * /api/grievances/v1/grievances/{id}:
 *   get:
 *     summary: Retrieve a grievance by ID
 *     tags: [Grievances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grievance to retrieve
 *     responses:
 *       200:
 *         description: Grievance retrieved successfully
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
 *                   example: Grievance retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     category:
 *                       type: string
 *                       example: "Category Name"
 *                     subCategory:
 *                       type: string
 *                       example: "Sub Category Name"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     fatherName:
 *                       type: string
 *                       example: "Father Name"
 *                     legislativeConstituency:
 *                       type: string
 *                       example: "Legislative Constituency"
 *                     boothNameOrNumber:
 *                       type: string
 *                       example: "Booth Name/Number"
 *                     contactNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     gender:
 *                       type: string
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     voterId:
 *                       type: string
 *                       example: "Voter ID"
 *                     ticketTitle:
 *                       type: string
 *                       example: "Ticket Title"
 *                     description:
 *                       type: string
 *                       example: "Grievance Description"
 *                     attachment:
 *                       type: string
 *                       example: "https://example.com/attachment.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Grievance not found
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
 *                   example: Grievance not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/grievances/v1/grievances/all:
 *   get:
 *     summary: Retrieve all grievances
 *     tags: [Grievances]
 *     responses:
 *       200:
 *         description: Grievances retrieved successfully
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
 *                   example: Grievances retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       category:
 *                         type: string
 *                         example: "Category Name"
 *                       subCategory:
 *                         type: string
 *                         example: "Sub Category Name"
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       fatherName:
 *                         type: string
 *                         example: "Father Name"
 *                       legislativeConstituency:
 *                         type: string
 *                         example: "Legislative Constituency"
 *                       boothNameOrNumber:
 *                         type: string
 *                         example: "Booth Name/Number"
 *                       contactNumber:
 *                         type: string
 *                         example: "1234567890"
 *                       gender:
 *                         type: string
 *                         example: "MALE"
 *                       age:
 *                         type: integer
 *                         example: 30
 *                       voterId:
 *                         type: string
 *                         example: "Voter ID"
 *                       ticketTitle:
 *                         type: string
 *                         example: "Ticket Title"
 *                       description:
 *                         type: string
 *                         example: "Grievance Description"
 *                       attachment:
 *                         type: string
 *                         example: "https://example.com/attachment.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No grievances found
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
 *                   example: No grievances found
 */

/**
 * @swagger
 * /api/grievances/v1/grievances:
 *   get:
 *     summary: Retrieve paginated grievances with optional search query
 *     tags: [Grievances]
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
 *         description: The search query to filter grievances.
 *     responses:
 *       200:
 *         description: Grievances retrieved successfully
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
 *                   example: Grievances retrieved successfully
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
 *                     grievances:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           category:
 *                             type: string
 *                             example: "Category Name"
 *                           subCategory:
 *                             type: string
 *                             example: "Sub Category Name"
 *                           fullName:
 *                             type: string
 *                             example: "John Doe"
 *                           fatherName:
 *                             type: string
 *                             example: "Father Name"
 *                           legislativeConstituency:
 *                             type: string
 *                             example: "Legislative Constituency"
 *                           boothNameOrNumber:
 *                             type: string
 *                             example: "Booth Name/Number"
 *                           contactNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           gender:
 *                             type: string
 *                             example: "MALE"
 *                           age:
 *                             type: integer
 *                             example: 30
 *                           voterId:
 *                             type: string
 *                             example: "Voter ID"
 *                           ticketTitle:
 *                             type: string
 *                             example: "Ticket Title"
 *                           description:
 *                             type: string
 *                             example: "Grievance Description"
 *                           attachment:
 *                             type: string
 *                             example: "https://example.com/attachment.jpg"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No grievances found
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
 *                   example: No grievances found
 */

/**
 * @swagger
 * /api/grievances/v1/grievances/{id}:
 *   put:
 *     summary: Update a grievance
 *     tags: [Grievances]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grievance to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the grievance
 *               subCategory:
 *                 type: string
 *                 description: The sub-category of the grievance
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               fatherName:
 *                 type: string
 *                 description: The father's name of the user
 *               legislativeConstituency:
 *                 type: string
 *                 description: The legislative constituency
 *               boothNameOrNumber:
 *                 type: string
 *                 description: The booth name or number
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the user
 *               gender:
 *                 type: string
 *                 description: The gender of the user (MALE, FEMALE, OTHER)
 *               age:
 *                 type: integer
 *                 description: The age of the user
 *               voterId:
 *                 type: string
 *                 description: The voter ID of the user
 *               ticketTitle:
 *                 type: string
 *                 description: The title of the grievance ticket
 *               description:
 *                 type: string
 *                 description: The description of the grievance
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 description: The new attachment file (e.g., doc, pdf, jpg)
 *     responses:
 *       200:
 *         description: Grievance updated successfully
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
 *                   example: Grievance updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     category:
 *                       type: string
 *                       example: "Category Name"
 *                     subCategory:
 *                       type: string
 *                       example: "Sub Category Name"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     fatherName:
 *                       type: string
 *                       example: "Father Name"
 *                     legislativeConstituency:
 *                       type: string
 *                       example: "Legislative Constituency"
 *                     boothNameOrNumber:
 *                       type: string
 *                       example: "Booth Name/Number"
 *                     contactNumber:
 *                       type: string
 *                       example: "1234567890"
 *                     gender:
 *                       type: string
 *                       example: "MALE"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     voterId:
 *                       type: string
 *                       example: "Voter ID"
 *                     ticketTitle:
 *                       type: string
 *                       example: "Ticket Title"
 *                     description:
 *                       type: string
 *                       example: "Grievance Description"
 *                     attachment:
 *                       type: string
 *                       example: "https://example.com/new-attachment.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Grievance not found
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
 *                   example: Grievance not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/grievances/v1/grievances/{id}:
 *   delete:
 *     summary: Delete a grievance
 *     tags: [Grievances]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the grievance to delete
 *     responses:
 *       200:
 *         description: Grievance deleted successfully
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
 *                   example: Grievance deleted successfully
 *       404:
 *         description: Grievance not found
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
 *                   example: Grievance not found
 *     security:
 *       - bearerAuth: []
 */
