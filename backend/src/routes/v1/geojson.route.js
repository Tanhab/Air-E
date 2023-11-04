const express = require('express');
const router = express.Router();
const geojson = require('../../../geoPopulationData.json')
const airjson = require('../../../geoAirQualityData.json');

router.get('/populationData',(req,res)=>{
  res.send(geojson);
});

router.get('/airQualityData',(req,res)=>{
  res.send(airjson);
});

module.exports = router;
