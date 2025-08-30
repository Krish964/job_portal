import { Router } from "express";
import { registerUser } from "../Controllers/Users.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js"
import { loginUser } from "../Controllers/login.controllers.js";
import { handleJobData } from "../Controllers/jobs.controllers.js"
import { authenticateUser } from "../Middlewares/Auth.middleware.js";
import { getAllApplications } from "../Controllers/admin.controllers.js"
import { handlePasswordReset } from "../Controllers/forgetPassword.controllers.js";
import { resetPasswordHandler } from "../Controllers/newPassword.controllers.js";
import { notificationHandler } from "../Controllers/Notification.controllers.js";
import { otpHandler, verifyOtp } from "../Controllers/Otp.controllers.js";
const router = Router()

router.route("/register").post(
  upload.single('resume'),
  registerUser
)

router.route("/login").post(loginUser)
router.route("/apply").post(handleJobData)
router.route("/applyJobs").get(authenticateUser, getAllApplications)
router.route("/HrPage").get(authenticateUser, getAllApplications)
router.route("/forgetPassword").post(handlePasswordReset)
router.route("/reset-password").post(resetPasswordHandler)
router.route("/notification").post(notificationHandler)
router.route("/send-otp").post(otpHandler)
router.route("/verify-otp").post(verifyOtp)

export default router