const express = require('express');
const connection = require('../database');
var router = express.Router();


router.get('/contact-messages', function (req, res, next) {
    connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/contact-messages/:id', function (req, res, next) {
    connection.query('SELECT * FROM messages WHERE id = ?', req.params.id, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).json({404: 'not_found'});
        }
        res.json(results);
    });

});

module.exports = router;
