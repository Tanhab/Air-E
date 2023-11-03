const Joi = require('joi');
const { latitudeValidator, longitudeValidator } = require('./custom.validation');

const autoComplete = {
  query: Joi.object().keys({
    keyword: Joi.string().required().trim(),
  }),
};


const searchByName= {
    query: Joi.object().keys({
        name: Joi.string().required().trim()
    })
}


const searchByLatLng= {
    query: Joi.object().keys({
        lat: Joi.number().required().custom(latitudeValidator),
        lng: Joi.number().required().custom(longitudeValidator),
    })
}

module.exports = {
  autoComplete,
  searchByName,
  searchByLatLng,
};
