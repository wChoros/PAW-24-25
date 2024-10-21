var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bigos' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Bigos' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Bigos' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Bigos' });
});

router.post('/submit_form', function(req, res, next) {
    // log the request body
    console.log(req.body);
    //redirect to the home page
    res.redirect('/');
});
module.exports = router;
