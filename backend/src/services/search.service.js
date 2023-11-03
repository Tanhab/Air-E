const httpStatus = require('http-status');
const { Country, City } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * @param {String} keyword: string to match
 * @returns array of objects of form {name:'_matched_}
 */
const autoComplete = async (keyword) => {
 
  const cities = await City.aggregate([
    {
      $match: {
        name: {
          $regex: keyword,
          $options: 'i',
        },
      },
    },

    {
      $sort: {
        name: -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 0,
        name: '$name',
      },
    },
  ]);

  const countries = await Country.aggregate([
    {
      $match: {
        name: {
          $regex: keyword,
          $options: 'i',
        },
      },
    },

    {
      $sort: {
        name: -1,
      },
    },
    {
      $limit: 2,
    },
    {
      $project: {
        _id: 0,
        name: '$name',
      },
    },
  ]);

  let data = [];
  if (countries) data = countries;
  if (cities) data = [...data, ...cities];

  return data;
};

/**
 * @param {String} name of the city/country to get the data for
 * @param {Boolean} isCountry is this name is a country
 * @returns {Object} {
 *                      lat,lng,
 *                      air:{aqi,no,no2,so2 so3,co,pm2_5,pm10,nh3},
 *                      cityName,countryName,
 *                      population,population_growth,gdp,gdp_growth,gdp_per_capita
 *
 *                    }
 */

const searchByName = async (name, isCountry) => {
  console.log({name, isCountry})
  if (isCountry) {
    const data = await Country.findOne({ name }).populate('capital');

    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Country "' + name + '" not found');
    }
    return {
      lat: data.capital.lat,
      lng: data.capital.lng,
      air: data.capital.air,
      cityName: data.capital.name,
      countryName: data.name,
      population: data.population,
      population_growth: data.population_growth,
      gdp: data.gdp,
      gdp_growth: data.gdp_growth,
      gdp_per_capita: data.gdp_per_capita,
    };
  }

  //if it is a city

  const data = await City.findOne({ name }).populate('country');

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'City "' + name + '" not found');
  }

  return {
    lat: data.lat,
    lng: data.lng,
    air: data.air,
    cityName: data.name,
    countryName: data.country.name,
    population: data.country.population,
    population_growth: data.country.population_growth,
    gdp: data.country.gdp,
    gdp_growth: data.country.gdp_growth,
    gdp_per_capita: data.country.gdp_per_capita,
  };
};

module.exports = {
  autoComplete,
  searchByName
};
