const routes = require('express').Router();

const users = require('./users');
const cars = require('./cars');

routes.use('/users', users);
routes.use('/cars', cars);


routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});



module.exports = routes;