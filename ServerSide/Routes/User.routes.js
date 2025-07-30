import { Router } from "express";
import { registerUser } from "../Controllers/Users.controllers.js";
import { upload } from "../Middlewares/multer.middleware.js"
import { loginUser } from "../Controllers/login.controllers.js";
import { applyJob } from "../Controllers/jobs.controllers.js"
import { authenticateUser } from "../Middlewares/Auth.middleware.js";
const router = Router()

router.route("/register").post(
  upload.single('resume'),
  registerUser
)

router.route("/login").post(loginUser)

router.route("/applyJobs").get(authenticateUser, applyJob);

export default router