const routes = require('express').Router();

const users = require('./users');
const cars = require('./cars');
const challenges = require('./challenges');
const groups = require('./groups');
const fuelLog = require('./fuelLog');

routes.use('/users', users);
routes.use('/cars', cars);
routes.use('/challenges', challenges);
routes.use('/groups', groups);
routes.use('/fuelLog', fuelLog);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});



module.exports = routes;