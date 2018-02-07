// BASE SETUP
// =============================================================================

var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

// IMPORTAR MODELS
// =============================================================================
var metodosUsuario = require('./model/users');
// IMPORTAR ROUTES
// =============================================================================
var router = express.Router();

// asigna routes para la terminacion en /users
// ----------------------------------------------------
router.route('/users')
// create a user (accessed at POST http://localhost:8080/api/users)  {"Username":"itovar","password":"ibrain"}
.post(function(req, res) {

	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var Username = req.body.Username; 
	var password = req.body.password;

	var user = metodosUsuario.User.build({ first_name:first_name,last_name : last_name, email: email, Username: Username, password: password });

	user.add(function(success){
		res.json({ message: 'Usurio creado exitosamente!!' });
	},
	function(err) {
		res.send(err);
	});
})
//==============================================================================
/*
.post('/login', function (req, res, next) { 
  var username = req.body.username;
  var password = req.body.password;

  usersDB.getUserByUsername(username)
    .then(function(user) {
        return bcrypt.compare(password, user.password);
    })
    .then(function(samePassword) {
        if(!samePassword) {
            res.status(403).send();
        }
        res.send();
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
})
*/


// get todo los usuarios (acceder al Servicio  GET http://localhost:8080/api/users)
.get(function(req, res) {
	var user = metodosUsuario.User.build();

	user.retrieveAll(function(users) {
		if (users) {
		  res.json(users);
		} else {
		  res.send(401, "Usuario no encontrado");
		}
	  }, function(error) {
		res.send("Usuario no encontrado");
	  });
});


// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

// update a user (accessed at PUT http://localhost:8080/api/users/:user_id)
.put(function(req, res) {
	var user = metodosUsuario.User.build();

  user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.email = req.body.email;
	user.Username = req.body.Username; 
	user.password = req.body.password;

	user.updateById(req.params.user_id, function(success) {
		console.log(success);
		if (success) {
			res.json({ message: 'Usuario actualizado!' });
		} else {
		  res.send(401, "Usuario no enconntrado");
		}
	  }, function(error) {
		res.send("Usuario no enconntrado");
	  });
})

// get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
	var user = metodosUsuario.User.build();

	user.retrieveById(req.params.user_id, function(users) {
		if (users) {
		  res.json(users);
		} else {
		  res.send(401, "Usuario no enconntrado");
		}
	  }, function(error) {
		res.send("Usuario no enconntrado");
	  });
})

// delete a user by id (accessed at DELETE http://localhost:8080/api/users/:user_id)
.delete(function(req, res) {
	var user = metodosUsuario.User.build();

	user.removeById(req.params.user_id, function(users) {
		if (users) {
		  res.json({ message: 'Usuario eliminado!!' });
		} else {
		  res.send(401, "Usuario no encontrado");
		}
	  }, function(error) {
		res.send("Usuario no enconntrado");
	  });
});

// Middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('algo esta pasando.');
	next();
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Accede a localhost:' + port +"/api/users/");
