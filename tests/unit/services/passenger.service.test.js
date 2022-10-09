const { expect } = require('chai');
const { requestTravel } = require('../../../src/services/passenger.service');

describe('Verricficando service pessoa passageira', function () {
  it('sem pontos de parada é realizada com sucesso', async function () {
    const WAITING_DRIVER = 1;
    const passenger = {
      id: 1,
      startingAddress: 'Rua X',
      endingAddress: 'Rua Y',
    };

    const travel = await requestTravel(
      passenger.id,
      passenger.startingAddress,
      passenger.endingAddress,
    );

    expect(travel).to.be.deep.equal({
      id: 1,
      passengerId: 1,
      driverId: null,
      travelStatusId: WAITING_DRIVER,
      startingAddress: 'Rua X',
      endingAddress: 'Rua Y',
      requestDate: '2022-10-09T03:04:04.374Z',
    });
  });

  it('com pontos de parada é realizada com sucesso', async function () {
    // arrange
    const WAITING_DRIVER = 1;
    const passenger = {
      id: 1,
      startingAddress: 'Rua X',
      endingAddress: 'Rua Y',
      waypoints: [{
        address: 'Rua Z',
        stopOrder: 1,
    }],
    };
    // act
    const travel = await requestTravel(
      passenger.id,
      passenger.startingAddress,
      passenger.endingAddress,
      passenger.waypoints,
    );
    // assert
    expect(travel).to.be.deep.equal({
      id: 1,
      passengerId: 1,
      driverId: null,
      travelStatusId: WAITING_DRIVER,
      startingAddress: 'Rua X',
      endingAddress: 'Rua Y',
      requestDate: '2022-08-24T03:04:04.374Z',
    });
  });

  it('com mesmo local de origem e destino é rejeitada', async function () {
    // arrange
    const passenger = {
      id: 1,
      startingAddress: 'Rua X',
      endingAddress: 'Rua X',
  };

  // act
  const error = await requestTravel(
      passenger.id,
      passenger.startingAddress,
      passenger.endingAddress,
  );

  // assert
  expect(error.type).to.equal('INVALID_VALUE');
  expect(error.message).to.equal('"endingAddress" contains an invalid value');
  });
});