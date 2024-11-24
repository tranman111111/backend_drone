// controllers/productController.js
import Product from "../models/Product.js";

// Tạo mới sản phẩm
const createProduct = async (req, res) => {
  try {
    const { name, price, image, weight } = req.body;
    const newProduct = new Product({ name, price, image, weight });
    const savedProduct = await newProduct.save();
    res.status(201).json({
        message: 'Thêm sản phẩm thành công',
        content: savedProduct
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error: err });
  }
};

// Lấy danh sách sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
        message: "lấy danh sách sản phẩm thành công",
        content: products
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sản phẩm", error: err });
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(
        {
            message: "lấy sản phẩm theo id thành công",
            content: product
        }
    );
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm", error: err });
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(
        {
            message: "cập nhật sản phẩm thành công",
            content: updatedProduct
        }
    );
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error: err });
  }
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "Sản phẩm đã được xóa" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: err });
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
