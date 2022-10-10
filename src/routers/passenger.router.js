const express = require('express');
const { passengerController } = require('../controllers');

const router = express.Router();

router.post('/:passengerId/request/travel', passengerController.createTravel);

module.exports = router;