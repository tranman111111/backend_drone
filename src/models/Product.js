import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  image: {
    type: String,  // URL của ảnh sản phẩm
  },
}, {
  timestamps: true,  // Tự động thêm createdAt và updatedAt
});

const Product = mongoose.model('Product', productSchema);
export default Product;
