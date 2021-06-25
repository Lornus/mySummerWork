const userRouter = require('./users_route_mst');
const planetRouter = require('./planets_route_mst');
const raceRouter = require('./race_route_mst')
const mstRouter = require('express').Router();

mstRouter
    .use('/users', userRouter)
    .use('/planets', planetRouter)
    .use('/races', raceRouter);


module.exports = mstRouter;