import { Router } from "express";
import { registerUser } from "../Controllers/Users.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js"
import { loginUser } from "../Controllers/login.controllers.js";
import { handleJobData } from "../Controllers/jobs.controllers.js"
import { authenticateUser } from "../Middlewares/Auth.middleware.js";
import { getAllApplications } from "../Controllers/admin.controllers.js"

const router = Router()

router.route("/register").post(
  upload.single('resume'),
  registerUser
)

router.route("/login").post(loginUser)
router.route("/apply").post(handleJobData)
router.route("/applyJobs").get(authenticateUser , getAllApplications)

// router.route("/applyJobs").get(authenticateUser, applyJob);

export default router