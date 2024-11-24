// routes/droneRoutes.js

import express from 'express';
import {droneControllers} from '../controllers/droneController.js';

const router = express.Router();

// Tạo mới drone
router.post('/', droneControllers.createDrone);

// Lấy danh sách drone
router.get('/', droneControllers.getDrones);

// Lấy drone theo ID
router.get('/:id', droneControllers.getDroneById);

// Cập nhật drone
router.put('/:id', droneControllers.updateDrone);

// Xóa drone
router.delete('/:id', droneControllers.deleteDrone);

export default router;
