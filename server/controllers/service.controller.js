import { Service } from '../models/service.model.js';

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ active: true });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { name, description, price, duration } = req.body;
    const service = await Service.create({
      name,
      description,
      price,
      duration
    });
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};