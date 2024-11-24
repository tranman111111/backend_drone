import express from 'express';
import { userControllers } from '../controllers/userController.js'; // Đảm bảo controller được import đúng

const router = express.Router();

// Tạo mới người dùng
router.post('/register', userControllers.register);

// Login
router.post('/login', userControllers.login);

// Lấy danh sách người dùng
router.get('/', userControllers.getAllUsers);

// Lấy người dùng theo ID
router.get('/:id', userControllers.getUserById);

// Cập nhật người dùng
router.put('/:id', userControllers.updateUser);

// Xóa người dùng
router.delete('/:id', userControllers.deleteUser);

export default router;
