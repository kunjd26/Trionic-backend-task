import express from "express";
import authController from "./AuthController.js";
import checkEmailExists from "./middlewares/CheckEmailExits.js";
import validateSignupRequest from "./requests/SignupRequest.js";
import validateSigninRequest from "./requests/SigninRequest.js";
import verifyJWT from "./middlewares/VerifyJWT.js";
import checkRateLimit from "./middlewares/CheckRateLimit.js";

const router = express.Router();

router.route("/sign-up").post([validateSignupRequest, checkEmailExists], authController.signUp);
router.route("/sign-in").post([validateSigninRequest, checkRateLimit], authController.signIn);
router.route("/sign-out").post();

export default router;