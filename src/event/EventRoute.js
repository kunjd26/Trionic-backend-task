import express from "express";
import eventController from "./EventController.js";
import showEventsRequest from "./requests/ShowEventsRequest.js";
import addEventsRequest from "./requests/AddEventsRequest.js";

const router = express.Router();

router.route("/").post([showEventsRequest], eventController.show);
router.route("/add").post([addEventsRequest], eventController.add);


export default router;