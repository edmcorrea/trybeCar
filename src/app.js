const express = require('express');
const { travelModel } = require('./models');
const { passengerService } = require('./services');

// const express = require('express');
// const { passengerRoutes, driverRoutes } = require('./routers');

// const app = express();
// app.use(express.json());
// app.use('/passengers', passengerRoutes);
// app.use('/drivers', driverRoutes);

// module.exports = app;

const app = express();

app.use(express.json());

const WAITING_DRIVER = 1;
const DRIVER_ON_THE_WAY = 2;
const TRAVEL_IN_PROGRESS = 3;
const TRAVEL_FINISHED = 4;

app.post('/passengers/:passengerId/request/travel', async (req, res) => {
  const { passengerId } = req.params;
  const { startingAddress, endingAddress, waypoints } = req.body;

  // if (await doesPassengerExist(passengerId)) {
  //   const travelId = await travelModel.insert({ passengerId, startingAddress, endingAddress });
  //   await Promise.all(saveWaypoints(waypoints, travelId));

  //   const travel = await travelModel.findById(travelId);
  //   return res.status(201).json(travel);
  // }

  await passengerService.requestTravel(passengerId, startingAddress, endingAddress, waypoints);

  res.status(500).json({ message: 'Ocorreu um erro' });
});

app.get('/drivers/open/travels', async (_req, res) => {
  const [result] = await travelModel.findByTravelStatusId(WAITING_DRIVER);
  res.status(200).json(result);
});

app.put('/drivers/:driverId/travels/:travelId/assign', async (req, res) => {
  const { travelId, driverId } = req.params;
  
  await travelModel.updateById(travelId, { driverId, travelStatusId: DRIVER_ON_THE_WAY });
  const travel = await travelModel.findById(travelId);

  res.status(200).json(travel);
});

app.put('/drivers/:driverId/travels/:travelId/start', async (req, res) => {
  const { travelId, driverId } = req.params;

  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_IN_PROGRESS });

  const travel = await travelModel.findById(travelId);

  res.status(200).json(travel);
});

app.put('/drivers/:driverId/travels/:travelId/end', async (req, res) => {
  const { travelId, driverId } = req.params;

  await travelModel.updateById(travelId, { driverId, travelStatusId: TRAVEL_FINISHED });

  const travel = await travelModel.findById(travelId);

  res.status(200).json(travel);
});

module.exports = app;
