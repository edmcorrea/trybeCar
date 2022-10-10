const { passengerModel } = require('../models');
const { validateId, validatedNewPassenger } = require('./validations/validationsInputValues');

// findAll
const findAll = async () => {
  const passengers = await passengerModel.findAll();
  return passengers;
};

// findById
const findById = async (passengerId) => {
  const error = validateId(passengerId);
  if (error.type) return error;

  const passenger = await passengerModel.findById(passengerId);
  if (!passenger) return { type: 'PASSENGER_NOT_FOUND', message: 'Passenger not found' }; 
  return { type: null, message: passenger };
};

// createPassenger
const createPassenger = async (name, email, phone) => {
  const error = validatedNewPassenger(name, email, phone);
  if (error.type) return error.message;
  
  const newPassengerId = await passengerModel.insert({ name, email, phone });
  const newPassenger = await passengerModel.findById(newPassengerId);

  return { type: null, message: newPassenger };
};

module.exports = {
  findAll,
  findById,
  createPassenger,
};