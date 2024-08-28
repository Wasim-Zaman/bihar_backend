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
 *   name: Booths
 *   description: Booth management
 */

/**
 * @swagger
 * /api/booths:
 *   post:
 *     summary: Create a new booth
 *     tags: [Booths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Booth 1"
 *                 description: The name of the booth
 *               constituencyId:
 *                 type: string
 *                 example: "uuid"
 *                 description: The ID of the constituency
 *               hindiName:
 *                 type: string
 *                 example: "हिंदी नाम"
 *                 description: The Hindi name of the booth
 *     responses:
 *       201:
 *         description: Booth created successfully
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
 *                   example: Booth created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Booth 1"
 *                     constituencyId:
 *                       type: string
 *                       example: "uuid"
 *                     hindiName:
 *                       type: string
 *                       example: "हिंदी नाम"
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
 * /api/booths/{id}:
 *   get:
 *     summary: Retrieve a booth by ID
 *     tags: [Booths]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booth to retrieve
 *     responses:
 *       200:
 *         description: Booth retrieved successfully
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
 *                   example: Booth retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Booth 1"
 *                     constituencyId:
 *                       type: string
 *                       example: "uuid"
 *                     hindiName:
 *                       type: string
 *                       example: "हिंदी नाम"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Booth not found
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
 *                   example: Booth not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booths/{id}:
 *   put:
 *     summary: Update a booth by ID
 *     tags: [Booths]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booth to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the booth
 *                 example: "Updated Booth 1"
 *               constituencyId:
 *                 type: string
 *                 description: The ID of the constituency
 *                 example: "uuid"
 *               hindiName:
 *                 type: string
 *                 description: The Hindi name of the booth
 *                 example: "अपडेटेड हिंदी नाम"
 *     responses:
 *       200:
 *         description: Booth updated successfully
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
 *                   example: Booth updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "uuid"
 *                     name:
 *                       type: string
 *                       example: "Updated Booth 1"
 *                     constituencyId:
 *                       type: string
 *                       example: "uuid"
 *                     hindiName:
 *                       type: string
 *                       example: "अपडेटेड हिंदी नाम"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-24T12:00:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: Booth not found
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
 *                   example: Booth not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booths/{id}:
 *   delete:
 *     summary: Delete a booth by ID
 *     tags: [Booths]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the booth to delete
 *     responses:
 *       200:
 *         description: Booth deleted successfully
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
 *                   example: Booth deleted successfully
 *       404:
 *         description: Booth not found
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
 *                   example: Booth not found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booths:
 *   get:
 *     summary: Retrieve paginated booths with optional search query
 *     tags: [Booths]
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
 *         description: The search query to filter booths.
 *     responses:
 *       200:
 *         description: Booths retrieved successfully
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
 *                   example: Booths retrieved successfully
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
 *                           constituencyId:
 *                             type: string
 *                             example: "uuid"
 *                           hindiName:
 *                             type: string
 *                             example: "हिंदी नाम"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-24T12:00:00Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-07-25T12:00:00Z"
 *       404:
 *         description: No booths found
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
 *                   example: No booths found
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/booths/all:
 *   get:
 *     summary: Retrieve all booths without pagination
 *     tags: [Booths]
 *     responses:
 *       200:
 *         description: All booths retrieved successfully
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
 *                   example: All booths retrieved successfully
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
 *                         example: "Booth 1"
 *                       constituencyId:
 *                         type: string
 *                         example: "uuid"
 *                       hindiName:
 *                         type: string
 *                         example: "हिंदी नाम"
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
