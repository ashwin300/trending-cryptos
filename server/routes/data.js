import express from "express";

const router = express.Router();
import { getData } from '../controllers/data.js'
router.get('/', getData);
export default router;