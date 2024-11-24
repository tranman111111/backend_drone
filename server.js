import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './src/routes/product.js';
import droneRoutes from './src/routes/drone.js';
import userRoutes from './src/routes/user.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(cors()); // Thêm CORS để cho phép yêu cầu từ frontend
app.use(express.json()); // Thay thế body-parser
app.use(express.urlencoded({ extended: true })); // Nếu cần xử lý form data

// Routes
app.use('/api/products', productRoutes);
app.use('/api/drones', droneRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Kết nối MongoDB thành công');
  })
  .catch(err => {
    console.error('Lỗi khi kết nối MongoDB:', err);
  });

// Xử lý lỗi 404 cho các route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ error: 'Không tìm thấy route' });
});

// Middleware xử lý lỗi tổng quát
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Đã xảy ra lỗi trên server' });
});

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});
