import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Controller để đăng ký người dùng
const register = async (req, res) => {
  const { username, email, password, role, address } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo mới người dùng (không mã hóa mật khẩu)
    const newUser = new User({
      username,
      email,
      password,
      role,
      address,
      createdAt: new Date(),
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).json({ message: "Người dùng đã được tạo", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};


// Hàm đăng nhập
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Trả về thông tin người dùng (bỏ mật khẩu để bảo mật)
    res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng nào" });
    }

    res.status(200).json({
      message: "Lấy tất cả user thành công",
      content: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err); // In ra lỗi để dễ dàng debug
    res.status(500).json({
      message: "Lỗi khi lấy danh sách người dùng",
      error: err.message,
    });
  }
};

// Lấy người dùng theo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json({
      message: "Lấy user theo id thành công",
      content: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy người dùng", error: err.message });
  }
};

// Cập nhật người dùng
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json({
      message: "update user thành công",
      content: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật người dùng", error: err.message });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json({ message: "Người dùng đã được xóa" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res
      .status(500)
      .json({ message: "Lỗi khi xóa người dùng", error: err.message });
  }
};

export const userControllers = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
