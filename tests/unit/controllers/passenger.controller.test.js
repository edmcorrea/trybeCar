// tests/unit/controllers/passenger.controller.test.js
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { passengerService } = require('../../../src/services');
const passengerController = require('../../../src/controllers/passenger.controller');

// Aqui estamos importando os dados de mock
const {
  happyControllerResponseCreateTravelObject,
  happyReqCreateTravelObject,
  happyResponseCreateTravelObject,
} = require('./mocks/passenger.controller.mock');

describe('Teste de unidade do passengerController', function () {
  it('Criando uma nova viagem', async function () {
    // Este é o objeto de resposta (res) inicialmente é um objeto vazio
    // que será preenchido pelo express
    const res = {};

    // Este é o objeto de requisição (req) que contém os dados necessários
    // para a requisição que ocorre sem nenhum problema
    const req = happyReqCreateTravelObject;

    // Criamos um stub para a função "res.status" que retorna o objeto res quando executada
    res.status = sinon.stub().returns(res);

    // Criamos um stub para a função "res.json" que não retorna nada
    res.json = sinon.stub().returns();

    // Criamos um stub para a chamada do service "passengerService.requestTravel" que irá
    // retornar uma resposta sem erros
    sinon
      .stub(passengerService, 'requestTravel')
      .resolves(happyControllerResponseCreateTravelObject);

    // Realizamos a chamada para o controller simulando o recebimento de uma requisição
    await passengerController.createTravel(req, res);

    // Validamos se o status code da resposta é igual a 201
    expect(res.status).to.have.been.calledWith(201);

    // Validamos se o json da resposta é igual ao do mock
    expect(res.json).to.have.been.calledWith(happyResponseCreateTravelObject);
  });
});
