const Joi = require('joi');

const populationData = {
  query: Joi.object().keys({
    rankBy:Joi.string().required().valid('gdp','gdp_growth', 'gdp_per_capita','population','population_growth')
  }),
};


const airQualityData= {
    query: Joi.object().keys({
        rankBy: Joi.string().required()
        .valid('aqi','co','no', 'no2','so2', 'o3','nh3','pm2_5','pm10')
    })
}


module.exports = {
  populationData,
  airQualityData
};
