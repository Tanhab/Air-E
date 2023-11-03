const httpStatus = require('http-status');
const { Country, City } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {enum} rankBy {gdp, gdp_growth, gdp_per_capita, population,population_growth}
 */

const getPopulationRanking = async (rankBy) => {
  const topTen = await Country.aggregate([
    {
      $sort: {
        [rankBy]: -1,
      },
    },
    {
      $limit: 10,
    },

    {
      $project: {
        _id: 0,
        name: '$name',
        value: '$' + rankBy,
      },
    },
  ]);

  const lastTen = await Country.aggregate([
    {
      $sort: {
        [rankBy]: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        name: '$name',
        value: '$' + rankBy,
      },
    },
  ]);

  return { topTen, lastTen };
};

/**
 *
 * @param {enum} rankBy {aqi,co,no,no2,so2,o3,pm2_5,pm10}
 */

const getAirRanking = async (rankBy) => {
  const topTen = await City.aggregate([
    {
      $sort: {
        ['air.' + rankBy]: 1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        name: '$name',
        value: '$air.' + rankBy,
      },
    },
  ]);

  const lastTen = await City.aggregate([
    {
      $sort: {
        ['air.' + rankBy]: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        name: '$name',
        value: '$air.' + rankBy,
      },
    },
  ]);

  return { topTen, lastTen };
};

module.exports = {
  getPopulationRanking,
  getAirRanking,
};
