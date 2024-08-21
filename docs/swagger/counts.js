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
 *   name: Counts
 *   description: Count records in all tables
 */

/**
 * @swagger
 * /api/counts/v1/all:
 *   get:
 *     summary: Retrieve the count of records in all tables
 *     tags: [Counts]
 *     responses:
 *       200:
 *         description: Counts fetched successfully
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
 *                   example: Counts fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userCount:
 *                       type: integer
 *                       example: 100
 *                     grievanceCount:
 *                       type: integer
 *                       example: 50
 *                     eventCount:
 *                       type: integer
 *                       example: 25
 *                     epicUserCount:
 *                       type: integer
 *                       example: 80
 *                     constituencyCount:
 *                       type: integer
 *                       example: 10
 *                     boothCount:
 *                       type: integer
 *                       example: 15
 *                     adminCount:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Unauthorized
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
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
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
 *                   example: An error occurred while fetching counts
 *     security:
 *       - bearerAuth: []
 */
