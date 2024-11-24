import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  droneId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Drone',  
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Product', 
    required: true, 
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  pickupLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  deliveryLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  deliveryTime: {
    type: Date,
  },
  shippingFee: {
    type: Number,
    required: true,
    default: 0,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
