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
 * /api/grievances/v2/grievances:
 *   post:
 *     summary: Create a new grievance with multiple attachments
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
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files (e.g., doc, pdf, jpg)
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
 * /api/grievances/v2/grievances/{id}:
 *   put:
 *     summary: Update a grievance with multiple attachments and additional fields
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
 *               fullName:
 *                 type: string
 *                 description: The full name of the user (optional)
 *               fatherName:
 *                 type: string
 *                 description: The father's name of the user (optional)
 *               legislativeConstituency:
 *                 type: string
 *                 description: The legislative constituency (optional)
 *               boothNameOrNumber:
 *                 type: string
 *                 description: The booth name or number (optional)
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the user (optional)
 *               gender:
 *                 type: string
 *                 description: The gender of the user (MALE, FEMALE, OTHER) (optional)
 *               age:
 *                 type: integer
 *                 description: The age of the user (optional)
 *               voterId:
 *                 type: string
 *                 description: The voter ID of the user (optional)
 *               category:
 *                 type: string
 *                 description: The category of the grievance (optional)
 *               subCategory:
 *                 type: string
 *                 description: The sub-category of the grievance (optional)
 *               ticketTitle:
 *                 type: string
 *                 description: The title of the grievance ticket (optional)
 *               description:
 *                 type: string
 *                 description: The description of the grievance (optional)
 *               status:
 *                 type: integer
 *                 description: The status of the grievance (optional)
 *               note:
 *                 type: string
 *                 description: Any additional notes regarding the grievance (optional)
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of new attachment files (e.g., doc, pdf, jpg)
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
 *                     category:
 *                       type: string
 *                       example: "Category Name"
 *                     subCategory:
 *                       type: string
 *                       example: "Sub Category Name"
 *                     ticketTitle:
 *                       type: string
 *                       example: "Ticket Title"
 *                     description:
 *                       type: string
 *                       example: "Grievance Description"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     note:
 *                       type: string
 *                       example: "Additional notes about the grievance"
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/new-attachment1.jpg"
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
 * /api/admin/grievances/v2/grievances/{id}:
 *   put:
 *     summary: Update a grievance with multiple attachments and additional fields
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
 *               fullName:
 *                 type: string
 *                 description: The full name of the user (optional)
 *               fatherName:
 *                 type: string
 *                 description: The father's name of the user (optional)
 *               legislativeConstituency:
 *                 type: string
 *                 description: The legislative constituency (optional)
 *               boothNameOrNumber:
 *                 type: string
 *                 description: The booth name or number (optional)
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the user (optional)
 *               gender:
 *                 type: string
 *                 description: The gender of the user (MALE, FEMALE, OTHER) (optional)
 *               age:
 *                 type: integer
 *                 description: The age of the user (optional)
 *               voterId:
 *                 type: string
 *                 description: The voter ID of the user (optional)
 *               category:
 *                 type: string
 *                 description: The category of the grievance (optional)
 *               subCategory:
 *                 type: string
 *                 description: The sub-category of the grievance (optional)
 *               ticketTitle:
 *                 type: string
 *                 description: The title of the grievance ticket (optional)
 *               description:
 *                 type: string
 *                 description: The description of the grievance (optional)
 *               status:
 *                 type: integer
 *                 description: The status of the grievance (optional)
 *               note:
 *                 type: string
 *                 description: Any additional notes regarding the grievance (optional)
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of new attachment files (e.g., doc, pdf, jpg)
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
 *                     category:
 *                       type: string
 *                       example: "Category Name"
 *                     subCategory:
 *                       type: string
 *                       example: "Sub Category Name"
 *                     ticketTitle:
 *                       type: string
 *                       example: "Ticket Title"
 *                     description:
 *                       type: string
 *                       example: "Grievance Description"
 *                     status:
 *                       type: integer
 *                       example: 1
 *                     note:
 *                       type: string
 *                       example: "Additional notes about the grievance"
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/new-attachment1.jpg"
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

/**
 * @swagger
 * /api/grievances/v1/admin/grievances:
 *   post:
 *     summary: Create a new grievance as an admin
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
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *                 description: The full name of the user registering the grievance (optional)
 *               fatherName:
 *                 type: string
 *                 example: "Father Name"
 *                 description: The father's name of the user (optional)
 *               legislativeConstituency:
 *                 type: string
 *                 example: "Legislative Constituency"
 *                 description: The legislative constituency (optional)
 *               boothNameOrNumber:
 *                 type: string
 *                 example: "Booth Name/Number"
 *                 description: The booth name or number (optional)
 *               contactNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: The contact number of the user
 *               gender:
 *                 type: string
 *                 example: "MALE"
 *                 description: The gender of the user (MALE, FEMALE, OTHER) (optional)
 *               age:
 *                 type: integer
 *                 example: 30
 *                 description: The age of the user (optional)
 *               voterId:
 *                 type: string
 *                 example: "Voter ID"
 *                 description: The voter ID of the user (optional)
 *               category:
 *                 type: string
 *                 example: "Category Name"
 *                 description: The category of the grievance
 *               subCategory:
 *                 type: string
 *                 example: "Sub Category Name"
 *                 description: The sub-category of the grievance
 *               ticketTitle:
 *                 type: string
 *                 example: "Ticket Title"
 *                 description: The title of the grievance ticket
 *               description:
 *                 type: string
 *                 example: "Grievance Description"
 *                 description: The description of the grievance
 *               isAdmin:
 *                 type: boolean
 *                 example: true
 *                 description: Indicates if the grievance is being created by an admin
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of attachment files (e.g., doc, pdf, jpg)
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
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
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
 *                     category:
 *                       type: string
 *                       example: "Category Name"
 *                     subCategory:
 *                       type: string
 *                       example: "Sub Category Name"
 *                     ticketTitle:
 *                       type: string
 *                       example: "Ticket Title"
 *                     description:
 *                       type: string
 *                       example: "Grievance Description"
 *                     isAdmin:
 *                       type: boolean
 *                       example: true
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://example.com/attachment1.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
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
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/grievances/v1/admin/grievances:
 *   get:
 *     summary: Retrieve paginated admin grievances
 *     tags: [Grievances]
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
 *           default: 10
 *         description: The number of items to retrieve per page.
 *     responses:
 *       200:
 *         description: Admin grievances retrieved successfully
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
 *                   example: Admin grievances retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
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
 *                           category:
 *                             type: string
 *                             example: "Category Name"
 *                           subCategory:
 *                             type: string
 *                             example: "Sub Category Name"
 *                           ticketTitle:
 *                             type: string
 *                             example: "Ticket Title"
 *                           description:
 *                             type: string
 *                             example: "Grievance Description"
 *                           isAdmin:
 *                             type: boolean
 *                             example: true
 *                           attachments:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "https://example.com/attachment1.jpg"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalItems:
 *                           type: integer
 *                           example: 50
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 10
 *       404:
 *         description: No admin grievances found
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
 *                   example: No admin grievances found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/grievances/v1/grievances/by-tab:
 *   get:
 *     summary: Retrieve grievances by tab name
 *     tags: [Grievances]
 *     parameters:
 *       - in: query
 *         name: tab
 *         schema:
 *           type: string
 *           enum: [accepted, completed]
 *           description: The tab name to filter grievances by
 *         required: true
 *         example: accepted
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items to retrieve per page
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
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           fullName:
 *                             type: string
 *                             example: "John Doe"
 *                           contactNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           status:
 *                             type: integer
 *                             example: 1
 *                           description:
 *                             type: string
 *                             example: "Grievance Description"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         totalItems:
 *                           type: integer
 *                           example: 50
 *                         itemsPerPage:
 *                           type: integer
 *                           example: 10
 *       400:
 *         description: Invalid tab name or validation error
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
 *                   example: Invalid tab name, tab name must be 'accepted' or 'completed'
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
 *     security:
 *       - bearerAuth: []
 */
