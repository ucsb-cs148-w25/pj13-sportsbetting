import express from "express";
import {
  getNBAInjuries,
  postNBAInjuries,
} from "../controllers/injuriesController.js";

const router = express.Router();

router.get("/", getNBAInjuries);
router.post("/scrape", postNBAInjuries);

export default router;