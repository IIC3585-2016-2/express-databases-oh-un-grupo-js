var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/adduser', function(req, res) {

    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('ejcollection');

    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            res.send("Error al ingresar info. a la db.");
        }
        else {
            res.redirect("/");
        }
    });
});


router.get('/newuser', function (req, res) {
	res.render('newuser', { title: 'Agrega Nuevo Usuario' });
});

router.get('/', function (req, res) {
	var db = req.db;
	var collection = db.get('ejcollection');
	collection.find({}, {}, function (err, docs){
		res.render('index', {
			"userlist": docs
		});
	});
});



module.exports = router;
