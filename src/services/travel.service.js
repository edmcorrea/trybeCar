const { travelModel, passengerModel, waypointModel } = require('../models');
const { validateRequestTravelSchema } = require('./validations/validationsInputValues');

const doesPassengerExist = async (passengerId) => {
  const passenger = passengerModel.findById(passengerId);
  if (passenger) return true;
  return false;
};

const saveWaypoints = (waypoints, travelId) => {
  if (waypoints && waypoints.length > 0) {
    return waypoints.map(async (value) => {
      await waypointModel.insert({
        address: value.address,
        stopOrder: value.stopOrder,
        travelId,
      });
    });
  }
  return [];
};

const requestTravel = async (passengerId, startingAddress, endingAddress, waypoints) => {
const validateResult = validateRequestTravelSchema(
  passengerId, startingAddress, endingAddress, waypoints,
);

if (validateResult.type) return validateResult;

  if (await doesPassengerExist(passengerId)) {
      const travelId = await travelModel.insert({
          passengerId,
          startingAddress,
          endingAddress,
      });

      await Promise.all(saveWaypoints(waypoints, travelId));
      const travel = await travelModel.findById(travelId);
      return { type: null, message: travel };
  }
};

module.exports = {
  requestTravel,
};
