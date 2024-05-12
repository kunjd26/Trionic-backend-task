import express from "express";
import userController from "./UserController.js";
import showEventsRequest from "./../event/requests/ShowEventsRequest.js";
import bookEventsRequest from "./requests/BookEventsRequest.js";
import verifyJWT from "./../auth/middlewares/VerifyJWT.js";

const router = express.Router();

router.route("/events/show").post([verifyJWT, showEventsRequest], userController.show);
router.route("/events/book").post([verifyJWT, bookEventsRequest], userController.book);
router.route("/events/history").post([verifyJWT, showEventsRequest], userController.history);

export default router;