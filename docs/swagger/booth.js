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
 * /api/booths/v1/booths:
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
 *               constituency:
 *                 type: string
 *                 example: "Constituency A"
 *                 description: The constituency of the booth (optional)
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
 * /api/booths/v1/booths/{id}:
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
 *                     constituency:
 *                       type: string
 *                       example: "Constituency A"
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
 * /api/booths/v1/booths/{id}:
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
 *                 example: "Updated Booth Name"
 *               constituency:
 *                 type: string
 *                 description: The constituency of the booth
 *                 example: "Updated Constituency"
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
 *                       example: "Updated Booth Name"
 *                     constituency:
 *                       type: string
 *                       example: "Updated Constituency"
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
 * /api/booths/v1/booths/{id}:
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
 * /api/booths/v1/booths/all:
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
 *                       constituency:
 *                         type: string
 *                         example: "Constituency A"
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
 * /api/booths/v1/booths/{id}:
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
 *                 example: "Booth 1"
 *               constituency:
 *                 type: string
 *                 description: The constituency of the booth
 *                 example: "Constituency A"
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
 *                       example: "Booth 1"
 *                     constituency:
 *                       type: string
 *                       example: "Constituency A"
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
