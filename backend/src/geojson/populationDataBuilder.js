const template = require('./staticPopulation.json');
const country_codes = require('../data/country_codes.json');
const countryNames = Object.keys(country_codes);
const closest_match = require('closest-match');
const { Country, City } = require('../models');
const fs = require('fs');

const buildPopulationGeoJSON = async () => {
  const cursor = Country.find().cursor();
  const data = {};
  let cnt = 0;

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    let code = closest_match.closestMatch(doc.name, countryNames);
    code = country_codes[code];
    data[code] = {
      gdp: doc.gdp,
      gdp_growth: doc.gdp_growth,
      gdp_per_capita: doc.gdp_per_capita,

      population: doc.population,
      population_growth: doc.population_growth,
    };

    if (cnt % 10 == 0) {
      console.log(cnt);
    }
    cnt++;
  }

  for (let obj of template.features) {
    let prp = obj.properties;
    obj.properties = { ...prp, ...data[prp.iso_a2] };
  }

  fs.writeFileSync('geoPopulationData.json', JSON.stringify(template));
};

const getAirQualityFeature = (doc) => {
  return {
    type: 'Feature',
    properties: {...doc.air},
    geometry: { type: 'Point', coordinates: [doc.lng, doc.lat, 0.0] },
  };
};
const buildAirQualityDataJSON = async () => {
  const cursor = City.find({ 'air.aqi': { $ne: null } }).cursor();
  let cnt = 0;
  const data = {
    type: 'FeatureCollection',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
    features: [],
  };

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {

    data.features.push(getAirQualityFeature(doc));
    if (cnt % 100 == 0) {
      console.log(cnt);
    }
    cnt++;
  }

  fs.writeFileSync('geoAirQualityData.json', JSON.stringify(data));
};

module.exports = {
  buildPopulationGeoJSON,
  buildAirQualityDataJSON
};
