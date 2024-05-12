import express from "express";
import authViews from "./AuthViews.js";
import eventViews from "./EventViews.js";
import userViews from "./UserViews.js";

const router = express.Router();

router.use(authViews);
router.use("/admin", eventViews);
router.use("/users", userViews);

export default router;