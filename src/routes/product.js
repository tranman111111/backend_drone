// routes/productRoutes.js
import express from 'express';
import {
  productControllers
} from '../controllers/productController.js';

const router = express.Router();

// Tạo mới sản phẩm
router.post('/', productControllers.createProduct);

// Lấy danh sách sản phẩm
router.get('/', productControllers.getProducts);

// Lấy sản phẩm theo ID
router.get('/:id', productControllers.getProductById);

// Cập nhật sản phẩm
router.put('/:id', productControllers.updateProduct);

// Xóa sản phẩm
router.delete('/:id', productControllers.deleteProduct);

export default router;
