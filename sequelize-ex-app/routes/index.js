var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Ejemplo con Sequelize' });

  models.User.findAll({
  	include: [ models.Task ]
  }).then(function(users) {
  	res.render('index', {
  		title: 'Express',
  		users: users
  	});
  });
  
});

module.exports = router;
