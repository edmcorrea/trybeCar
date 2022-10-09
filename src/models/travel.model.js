const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const insert = async (travel) => {
  const columns = Object.keys(snakeize(travel))
    .map(((key) => key)) // modificacao do codigo
    .join(', ');

  const placeholders = Object.keys(travel)
  .map((_key) => '?')
  .join(', ');
  // console.log(columns, placeholders);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO travels (${columns}) VALUE (${placeholders})`,
    [...Object.values(travel)],
    );

    return insertId;
};

const findById = async (travelId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM travels WHERE id = ?',
    [travelId],
  ); // fazer o log dessa constante para sber o que vem dentro
  return camelize(result);
};

const findByTravelStatusId = async (travelStatusId) => {
  const [result] = await connection.execute(
    'SELECT * FROM travels WHERE travel_status_id = ?',
    [travelStatusId],
  );
  return camelize(result);
};

const updateById = async (travelId, dataToUpdate) => {
  const updateColumns = Object.keys(snakeize(dataToUpdate))
  .map((key) => `${key}=?`)
  .join(', ');
  const updated = await connection.execute(
    `UPDATE travels SET ${updateColumns} WHERE id = ?`,
    [travelId, ...Object.values(dataToUpdate)],
  );
  return updated;
};

module.exports = {
  insert,
  findById,
  findByTravelStatusId,
  updateById,
};