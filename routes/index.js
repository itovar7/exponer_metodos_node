var express = require('express');
var router = express.Router();

//router.route('/w')
//app.use('/api', router);

/* GET home page. */
router.get('/w', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/hola', function(req, res, next) {
  /**
   * desarrollas tu fibonacci
   */
  res.render('index', { title: 'Hola Express' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  /**
   * desarrollas tu fibonacci
   */
  res.render('login', { title: 'Login Express' });
});




module.exports = router;
