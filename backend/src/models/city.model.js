const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const citySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ascii_name: {
      type: String,
      required: true,
      unique: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },

    air: {
      default: {},
      aqi: { type: Number },
      co: { type: Number },
      no: { type: Number },
      no2: { type: Number },
      o3: { type: Number },
      so2: { type: Number },
      pm2_5: { type: Number },
      pm10: { type: Number },
      nh3: { type: Number },
      upadted: { type: Number }, //unix time when the AIR data was updated.
    },

    country: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Country',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
citySchema.plugin(toJSON);
citySchema.plugin(paginate);

const City = mongoose.model('City', citySchema);

module.exports = City;
