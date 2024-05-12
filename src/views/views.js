import express from "express";
import authViews from "./auth-views.js";
import eventViews from "./event-views.js";
import userViews from "./user-views.js";

const router = express.Router();

router.use(authViews);
router.use(eventViews);
router.use(userViews);

export default router;