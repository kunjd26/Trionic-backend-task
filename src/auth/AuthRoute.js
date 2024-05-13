import express from "express";
import authController from "./AuthController.js";
import checkEmailExists from "./middlewares/CheckEmailExits.js";
import validateSignupRequest from "./requests/SignupRequest.js";
import validateSigninRequest from "./requests/SigninRequest.js";
import checkRateLimit from "./middlewares/CheckRateLimit.js";
import googleAuthRequest from "./requests/GoogleAuthRequest.js";
import checkUserRole from "./middlewares/CheckUserRole.js";
import validateForgotPasswordRequest from "./requests/ForgotPasswordRequest.js";
import checkEmailNotExits from "./middlewares/CheckEmailNotExits.js";
import validateResetPassword from "./requests/ResetPasswordRequest.js";

const router = express.Router();

router.route("/sign-up").post([validateSignupRequest, checkEmailExists], authController.signup);
router.route("/sign-in").post([validateSigninRequest, checkEmailNotExits, checkUserRole, checkRateLimit], authController.signin);
router.route("/google-auth").post([googleAuthRequest], authController.googleAuth);
router.route("/forgot-password").post([validateForgotPasswordRequest, checkEmailNotExits], authController.forgotPassword);
router.route("/reset-password").post([validateResetPassword, checkEmailNotExits], authController.resetPassword);

export default router;