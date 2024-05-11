import express from "express";
import authController from "./AuthController.js";
import checkEmailExists from "./middlewares/CheckEmailExits.js";
import validateSignupRequest from "./requests/SignupRequest.js";
import validateSigninRequest from "./requests/SigninRequest.js";
import verifyJWT from "./middlewares/VerifyJWT.js";
import checkRateLimit from "./middlewares/CheckRateLimit.js";
import checkEmailWithoutThirdParty from "./middlewares/CheckEmailWithoutThirdParty.js";
import googleAuthRequest from "./requests/GoogleAuthRequest.js";

const router = express.Router();

router.route("/sign-up").post([validateSignupRequest, checkEmailExists], authController.signup);
router.route("/sign-in").post([validateSigninRequest, checkEmailWithoutThirdParty, checkRateLimit], authController.signin);
router.route("/sign-out").post();
router.route("/google-auth").post([googleAuthRequest], authController.googleAuth);

export default router;