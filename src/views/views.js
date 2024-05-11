import express from "express";
import authViews from "./auth-views.js";
import eventViews from "./event-views.js";

const router = express.Router();

router.use(authViews);
router.use(eventViews);

export default router;