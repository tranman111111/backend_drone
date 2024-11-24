import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // Dùng để mã hóa mật khẩu người dùng

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Vui lòng nhập email hợp lệ'],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'driver', 'customer'],
    default: 'customer',
  },
  address: {
    type: String,
  },
}, {
  timestamps: true,  // Tự động thêm createdAt và updatedAt
});

// Mã hóa mật khẩu trước khi lưu vào MongoDB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Kiểm tra mật khẩu người dùng nhập vào có khớp với mật khẩu đã mã hóa trong database
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Error comparing password');
  }
};

const User = mongoose.model('User', userSchema);
export default User;
