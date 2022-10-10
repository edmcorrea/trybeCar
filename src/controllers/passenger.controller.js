const { passengerService } = require('../services');
const errorMap = require('../utils/errorMap');

const createTravel = async (req, res) => {
  const { passengerId } = req.params;
  const { startingAddress, endingAddress, waypoints } = req.body;

  const { type, message } = await passengerService.requestTravel(
    passengerId,
    startingAddress,
    endingAddress,
    waypoints,
  );

  // Linha de código responsável por gerar uma resposta em caso de erro no
  // processamento do componente de software da camada `Service`
  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(201).json(message);
};

module.exports = {
  createTravel,
};
