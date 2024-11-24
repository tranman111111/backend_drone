// controllers/droneController.js

import Drone from '../models/Drone.js';

// Tạo mới drone
const createDrone = async (req, res) => {
  try {
    const newDrone = new Drone(req.body);
    const savedDrone = await newDrone.save();
    res.status(201).json({
        message: 'tạo mới drone thành công',
        content: savedDrone
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo drone', error: err });
  }
};

// Lấy danh sách drone
const getDrones = async (req, res) => {
  try {
    const drones = await Drone.find();
    res.status(200).json(
        {
            message: 'lấy danh sách drone thành công',
            content: drones
        }
    );
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách drone', error: err });
  }
};

// Lấy drone theo ID
const getDroneById = async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id);
    if (!drone) {
      return res.status(404).json({ message: 'Drone không tồn tại' });
    }
    res.status(200).json(
        {
            message: 'lấy drone theo id thành công',
            content: drone
        }
    );
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy drone', error: err });
  }
};

// Cập nhật drone
const updateDrone = async (req, res) => {
  try {
    const updatedDrone = await Drone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(
        {
            message: 'cập nhật drone thành công',
            content: updatedDrone
        }
    );
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật drone', error: err });
  }
};

// Xóa drone
const deleteDrone = async (req, res) => {
  try {
    const deletedDrone = await Drone.findByIdAndDelete(req.params.id);
    if (!deletedDrone) {
      return res.status(404).json({ message: 'Drone không tồn tại' });
    }
    res.status(200).json({ message: 'Drone đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa drone', error: err });
  }
};

export const droneControllers = {
    createDrone,
    getDrones,
    getDroneById,
    updateDrone,
    deleteDrone,
  };
  
