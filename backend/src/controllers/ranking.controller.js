const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { rankingService } = require('../services');

const rankByPopulation = catchAsync(async(req, res)=>{
    const ranking = await  rankingService.getPopulationRanking(req.query.rankBy);
    res.send(ranking);
});

const rankByAirQuality = catchAsync(async(req, res)=>{
    const ranking = await  rankingService.getAirRanking(req.query.rankBy);
    res.send(ranking);
});


module.exports = {
    rankByAirQuality,
    rankByPopulation
};
