// routes (navigation  useNavigate)
import express from "express";
import userRoutes from "./users.js";
import groupRoutes from "./groups.js";
import betRoutes from "./bets.js";
import userBetRoutes from "./userBets.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/bets", betRoutes);
router.use("/userbets", userBetRoutes);

export default router;

