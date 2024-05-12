import express from "express";
import userController from "./UserController.js";
import showEventsRequest from "./../event/requests/ShowEventsRequest.js";
import bookEventsRequest from "./requests/BookEventsRequest.js";


const router = express.Router();

router.route("/events/show").post([showEventsRequest], userController.show);
router.route("/events/book").post([bookEventsRequest], userController.book);
router.route("/events/history").post([showEventsRequest], userController.history);

export default router;