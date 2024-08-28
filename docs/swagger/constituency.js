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
 *   name: Constituencies
 *   description: Constituency management
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies:
 *   post:
 *     summary: Create a new constituency
 *     tags: [Constituencies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Constituency 1"
 *                 description: The name of the constituency
 *               hindiName:
 *                 type: string
 *                 example: "हिंदी नाम"
 *                 description: The Hindi name of the constituency
 *               booths:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Booth 1"
 *     responses:
 *       201:
 *         description: Constituency created successfully
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
 *                   example: Constituency created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Constituency 1"
 *                     hindiName:
 *                       type: string
 *                       example: "हिंदी नाम"
 *                     booths:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "Booth 1"
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
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies/{id}:
 *   get:
 *     summary: Retrieve a constituency by ID
 *     tags: [Constituencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the constituency to retrieve
 *     responses:
 *       200:
 *         description: Constituency retrieved successfully
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
 *                   example: Constituency retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Constituency 1"
 *                     hindiName:
 *                       type: string
 *                       example: "हिंदी नाम"
 *                     booths:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "Booth 1"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Constituency not found
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
 *                   example: Constituency not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies:
 *   get:
 *     summary: Retrieve paginated constituencies with optional search query
 *     tags: [Constituencies]
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
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter constituencies.
 *     responses:
 *       200:
 *         description: Constituencies retrieved successfully
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
 *                   example: Constituencies retrieved successfully
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
 *                     constituencies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "Constituency 1"
 *                           hindiName:
 *                             type: string
 *                             example: "हिंदी नाम"
 *                           booths:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   example: "uuid"
 *                                 name:
 *                                   type: string
 *                                   example: "Booth 1"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No constituencies found
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
 *                   example: No constituencies found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies/all:
 *   get:
 *     summary: Retrieve all constituencies without pagination
 *     tags: [Constituencies]
 *     responses:
 *       200:
 *         description: All constituencies retrieved successfully
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
 *                   example: All constituencies retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       name:
 *                         type: string
 *                         example: "Constituency 1"
 *                       hindiName:
 *                         type: string
 *                         example: "हिंदी नाम"
 *                       booths:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "uuid"
 *                             name:
 *                               type: string
 *                               example: "Booth 1"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies/{id}:
 *   put:
 *     summary: Update a constituency by ID
 *     tags: [Constituencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the constituency to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the constituency
 *                 example: "Constituency 1"
 *               hindiName:
 *                 type: string
 *                 description: The Hindi name of the constituency
 *                 example: "Updated हिंदी नाम"
 *               booths:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Updated Booth 1"
 *     responses:
 *       200:
 *         description: Constituency updated successfully
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
 *                   example: Constituency updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Constituency 1"
 *                     hindiName:
 *                       type: string
 *                       example: "Updated हिंदी नाम"
 *                     booths:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "Updated Booth 1"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Constituency not found
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
 *                   example: Constituency not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies/{id}:
 *   delete:
 *     summary: Delete a constituency by ID
 *     tags: [Constituencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the constituency to delete
 *     responses:
 *       200:
 *         description: Constituency deleted successfully
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
 *                   example: Constituency deleted successfully
 *       404:
 *         description: Constituency not found
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
 *                   example: Constituency not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies:
 *   get:
 *     summary: Retrieve paginated constituencies with optional search query
 *     tags: [Constituencies]
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
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: The search query to filter constituencies.
 *     responses:
 *       200:
 *         description: Constituencies retrieved successfully
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
 *                   example: Constituencies retrieved successfully
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
 *                     constituencies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "uuid"
 *                           name:
 *                             type: string
 *                             example: "Constituency 1"
 *                           hindiName:
 *                             type: string
 *                             example: "हिंदी नाम"
 *                           booths:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   example: "uuid"
 *                                 name:
 *                                   type: string
 *                                   example: "Booth 1"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No constituencies found
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
 *                   example: No constituencies found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/constituencies/v1/constituencies/all:
 *   get:
 *     summary: Retrieve all constituencies without pagination
 *     tags: [Constituencies]
 *     responses:
 *       200:
 *         description: All constituencies retrieved successfully
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
 *                   example: All constituencies retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid"
 *                       name:
 *                         type: string
 *                         example: "Constituency 1"
 *                       hindiName:
 *                         type: string
 *                         example: "हिंदी नाम"
 *                       booths:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "uuid"
 *                             name:
 *                               type: string
 *                               example: "Booth 1"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-24T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-07-25T12:00:00Z"
 *     security:
 *       - bearerAuth: []
 */
