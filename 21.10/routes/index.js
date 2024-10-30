const express = require('express');
const connection = require('../database');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Bigos'});
});

router.get('/about', function (req, res, next) {
    res.render('about', {title: 'Bigos'});
});

router.get('/menu', function (req, res, next) {
    res.render('menu', {title: 'Bigos'});
});

router.get('/contact', function (req, res, next) {
    res.render('contact', {title: 'Bigos'});
});

router.post('/submit_form', function (req, res, next) {
    // log the request body
    console.log(req.body);
    // insert the form data into the database
    connection.query('INSERT INTO messages SET ?', req.body, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/contact');
    });
});
module.exports = router;
