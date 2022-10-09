const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

// criar a funcao findAll

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM passengers',
  );

  return result;
};

// criar a funcao findById
const findById = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id=?',
    [passengerId],
  );

  return camelize(passenger);
};

// criar a funcao insert
const insert = async (passenger) => {
  const columns = Object.keys(snakeize(passenger))
  .join(', ');
  const placeholders = Object.keys(passenger)
  .map((_value) => '?')
  .join(', ');
  const [{ insertId }] = await connection.execute(
  `INSERT INTO passengers (${columns}) VALUE (${placeholders})`,
  [...Object.values(passenger)],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};
