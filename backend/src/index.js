const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const uploadData = require('./data/data_uploader');
const { updatePopulationData, updateAirData } = require('./data/data_updater');
const { buildPopulationGeoJSON, buildAirQualityDataJSON } = require('./geojson/populationDataBuilder');


let server;
mongoose.set('maxTimeMS', 1000*60*60);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  mongoose.set('maxTimeMS', 1000*60*60);
  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
    // uploadData();
    
    updateAirData();
    //buildAirQualityDataJSON();
    // buildPopulationGeoJSON();
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
