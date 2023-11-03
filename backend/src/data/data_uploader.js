/**
 * Uploads the raw data in - countries and cities to the database
 * ASSUMPTION = DATABASE is empty
 */

const { Country, City } = require('../models');
const closest_match = require('closest-match');

let countries = require('./capital_map.json');
let cities = require('./place_list.json');

let countries_ids = {};

const dataUploader = async () => {
  const countryNames = Object.keys(countries);
  let cnt = 0;

  if (false)
    for (let country of countryNames) {
      let result = await Country.create({
        name: country,
      });

      countries_ids[country] = result.id;

      cnt++;
      if (cnt % 20 == 0) {
        console.log('counties: ', cnt);
      }
    }

  if (true) {
    const cursor = Country.find().cursor();
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      countries_ids[doc.name] = doc.id;
    }
  }

  cnt = 0;
  let errcnt=0;
  console.log('cities: ', cities.length);

  for (let city of cities) {
    try {
      let countryN = closest_match.closestMatch(city.country, countryNames);

      let result = await City.create({
        name: city.name,
        ascii_name: city.ascii_name,
        lat: city.lat,
        lng: city.lng,
        country: countries_ids[countryN],
      });

      if (countries[countryN].toLocaleLowerCase() === city.name.toLocaleLowerCase()) {
        const cn = Country.findById(countries_ids[countryN]);

        await cn.update({
          capital: result.id,
        });
      }
      cnt++;
    } catch (e) {
      errcnt++;
    }

    if (cnt % 100 == 0) {
      console.log('uploaded: ', cnt, "error: ",errcnt);
    }
  }
};

module.exports = dataUploader;
