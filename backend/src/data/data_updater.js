

const country_codes = require('./country_codes.json');
const countryNames = Object.keys(country_codes);
const mt = require('closest-match');
const axios = require('axios');
const { Country } = require('../models');
const config = require('../config/config');
const indicators = {
  population: 'SP.POP.TOTL',
  population_growth: 'SP.POP.GROW',
  gdp: 'NY.GDP.MKTP.CD',
  gdp_per_capita: 'NY.GDP.PCAP.CD',
  gdp_growth: 'NY.GDP.MKTP.KD.ZG',
};

async function getPopulationData(countryName) {
  const cName = mt.closestMatch(countryName, countryNames);
  const cntryCode = country_codes[cName];

  let data = {};

  for (let key in indicators) {
    const result = await axios.get(
      `https://api.worldbank.org/v2/country/${cntryCode}/indicator/${indicators[key]}?format=json`
    );
    data[key] = result.data[1][0].value;
  }

  return data;
}

async function updatePopulationData() {
  const cursor = Country.find().cursor();
  const promises = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const data = await getPopulationData(doc.name);

    promises.push(Country.findByIdAndUpdate(doc.id, { ...data, updated: Math.floor(Date.now() / 1000) }));
  }

  await Promise.all(promises);
}

async function getAirData(lat, lng) {
  let data;

  const result = await axios.get(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${config.openWeatherKey}`
  );

  data = result.data.list[0];
  return {
    aqi: data.main.aqi,
    ...data.components,
    updated: data.dt,
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateAirData() {
  let promises = [];

  const cursor = City.find().cursor();
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    try {
      const data = await getAirData(doc.lat, doc.lng);
      promises.push(City.findByIdAndUpdate(doc.id, { air: { ...data } }));

      if (promises.length > 2000) {
        await Promise.all(promises);
        promises = [];
      }
    } catch (e) {}
    await delay(700);
  }

  await Promise.all(promises);
}


module.exports = {
    updateAirData,
    updatePopulationData,
    getAirData,
    getPopulationData,
}
