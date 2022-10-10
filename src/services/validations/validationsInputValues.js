const { addRequestTravelSchema, idSchema, addPassengerSchema } = require('./schemas');

// validateId
const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

// validatedNewPassenger
const validatedNewPassenger = (name, email, phone) => {
  const { error } = addPassengerSchema.validate({ name, email, phone });
  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateRequestTravelSchema = (passengerId, startingAddress, endingAddress, waypoints) => {
  const { error } = addRequestTravelSchema
  .validate({ passengerId, startingAddress, endingAddress, waypoints });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validatedNewPassenger,
  validateRequestTravelSchema,
};