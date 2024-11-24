import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'in-use', 'maintenance'],
  },
  batteryLevel: {
    type: Number,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  maxPayload: {
    type: Number,
  },
  maxRange: {
    type: Number,
  },
  speed: {
    type: Number,
  },
}, {
  timestamps: true,  // Tự động thêm createdAt và updatedAt
});

const Drone = mongoose.model('Drone', droneSchema);
export default Drone;
