import express from "express";
import eventController from "./EventController.js";
import showEventsRequest from "./requests/ShowEventsRequest.js";
import addOrUpdateEventsRequest from "./requests/AddOrUpdateEventsRequest.js";
import verifyJWT from "./../auth/middlewares/VerifyJWT.js";

const router = express.Router();

router.route("/show").post([verifyJWT, showEventsRequest], eventController.show);
router.route("/show/:id").post([verifyJWT, showEventsRequest], eventController.showOne);
router.route("/add").post([verifyJWT, addOrUpdateEventsRequest], eventController.add);
router.route("/update/:id").put([verifyJWT, addOrUpdateEventsRequest], eventController.update);
router.route("/delete/:id").delete([verifyJWT, showEventsRequest], eventController.delete);


export default router;