// routes (navigation  useNavigate)

import express from 'express';
import { getList, postList, putList, deleteList } from '../controllers/controllers.js';

const router = express.Router();

router.get("/", getList);
router.post("/:id", postList);
router.put("/:id", putList);
router.delete("/:id", deleteList);

export default router