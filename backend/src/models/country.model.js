const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    gdp: {
      type: Number,
      default: -1,
    },
    gdp_per_capita: {
      type: Number,
      default: -1,
    },
    gdp_growth: {
      type: Number,
      default: -1,
    },
    population: {
      type: Number,
      default: -1,
    },
    population_growth: {
      type: Number,
      default: -1,
    },

    updated: {
      type: Number, //UNIX time when the population data was updated
    },

    capital: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'City',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
countrySchema.plugin(toJSON);
countrySchema.plugin(paginate);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
