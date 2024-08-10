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
 *   name: EpicUser
 *   description: Epic User management
 */

/**
 * @swagger
 * /api/epicUser/v1/login:
 *   post:
 *     summary: Login or register an epic user based on mobile number, FCM token, and Epic ID
 *     tags: [EpicUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - fcmToken
 *               - epicId
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: The user's mobile number
 *               fcmToken:
 *                 type: string
 *                 example: "fcm-token-string"
 *                 description: The user's FCM token for push notifications
 *               epicId:
 *                 type: string
 *                 example: "ABC123XYZ"
 *                 description: The user's Epic ID
 *     responses:
 *       200:
 *         description: Login or registration successful
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
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     epicUser:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         mobileNumber:
 *                           type: string
 *                           example: "1234567890"
 *                         epicId:
 *                           type: string
 *                           example: "ABC123XYZ"
 *                         image:
 *                           type: string
 *                           example: "https://example.com/profile-picture.jpg"
 *                         fcmToken:
 *                           type: string
 *                           example: "fcm-token-string"
 *                     token:
 *                       type: string
 *                       example: "jwt-token-string"
 *       400:
 *         description: Mobile number, FCM token, or Epic ID is required
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
 *                   example: "Mobile number, FCM token, or Epic ID is required"
 */

/**
 * @swagger
 * /api/epicUser/v1/update:
 *   put:
 *     summary: Update epic user details based on mobile number with image upload
 *     tags: [EpicUser]
 *     security:
 *       - bearerAuth: []
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
 *                 description: The user's full name
 *                 example: "John Doe"
 *               fatherName:
 *                 type: string
 *                 description: The user's father's name
 *                 example: "Doe Senior"
 *               epicId:
 *                 type: string
 *                 description: The user's Epic ID
 *                 example: "ABC123XYZ"
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *                 description: The user's gender
 *                 example: "MALE"
 *               age:
 *                 type: integer
 *                 description: The user's age
 *                 example: 30
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: "user@example.com"
 *               legislativeConstituency:
 *                 type: string
 *                 description: The user's legislative constituency
 *                 example: "XYZ Constituency"
 *               boothNameOrNumber:
 *                 type: string
 *                 description: The user's booth name or number
 *                 example: "Booth 12"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The user's profile picture (e.g., jpg, png)
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: "User updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     epicUser:
 *                       type: object
 *                       properties:
 *                         fullName:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         mobileNumber:
 *                           type: string
 *                           example: "1234567890"
 *                         epicId:
 *                           type: string
 *                           example: "ABC123XYZ"
 *                         image:
 *                           type: string
 *                           example: "https://example.com/profile-picture.jpg"
 *                         fcmToken:
 *                           type: string
 *                           example: "fcm-token-string"
 *       400:
 *         description: Validation error or unauthorized request
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
 *                   example: "Validation error or unauthorized request"
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
 *                   example: "Unauthorized: Mobile number mismatch"
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
 *                   example: "User not found"
 *       409:
 *         description: Email already registered
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
 *                   example: "Email already registered"
 */
