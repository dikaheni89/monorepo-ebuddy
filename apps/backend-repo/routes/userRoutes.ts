import express from 'express';
import {authMiddleware} from "@/middleware/authMiddleware";
import {fetchTopUsers, fetchUserData, updateUserData} from "@/controller/api";

const router = express.Router();

router.put('/update-user-data', authMiddleware, updateUserData);
router.get('/fetch-user-data/:id', authMiddleware, fetchUserData);
router.get('/ranked-users', authMiddleware, fetchTopUsers);

export default router;
