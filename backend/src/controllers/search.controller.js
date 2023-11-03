const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { searchService } = require('../services');

const countries = require('../data/capital_map.json');
const { getAirData, getPopulationData } = require('../data/data_updater');
const { default: axios } = require('axios');

const autoComplete = catchAsync(async (req, res) => {
  let result = await searchService.autoComplete(req.query.keyword);
  result = result.map((e) => e.name);
  res.send(result);
});

const searchByName = catchAsync(async (req, res) => {
  const name = req.query.name;
  const result = await searchService.searchByName(name, !!countries[name]);
  return res.send(result);
});

const searchByLatLng = catchAsync(async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;

  const airdata = await getAirData(lat, lng);

  let geoData = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=20f1455aaa5f4d4bbdb221ec8cd28c9e`
  );

  geoData = geoData.data.features[0];

  const countryName = geoData.properties.country;
  const cityName = geoData.properties.city || geoData.properties.county || geoData.properties.suburb;
 

  let population_data = await getPopulationData(countryName);

  const result = {
    air: airdata,
    ...population_data,
    countryName,
    cityName,
    bbox: geoData.bbox,
  };

  res.send(result);
});

module.exports = {
  autoComplete,
  searchByName,
  searchByLatLng,
};
