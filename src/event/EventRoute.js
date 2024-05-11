import express from "express";
import eventController from "./EventController.js";
import showEventsRequest from "./requests/ShowEventsRequest.js";
import addOrUpdateEventsRequest from "./requests/AddOrUpdateEventsRequest.js";

const router = express.Router();

router.route("/show").post([showEventsRequest], eventController.show);
router.route("/show/:id").post([showEventsRequest], eventController.showOne);
router.route("/add").post([addOrUpdateEventsRequest], eventController.add);
router.route("/update/:id").put([addOrUpdateEventsRequest], eventController.update);
router.route("/delete/:id").delete([showEventsRequest], eventController.delete);


export default router;