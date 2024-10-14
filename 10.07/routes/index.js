var express = require('express');
var path = require('path');
const fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/home', function (req, res, next) {
    res.send('Hello World')
});

router.get('/json', function (req, res, next) {
    res.json({title: 'Express'});
});

router.get('/html', function (req, res, next) {
    res.send('<h1>Hello World</h1>')
});

router.get('/html_file', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

router.get('/get_params', function (req, res, next) {
    date = new Date().toISOString();
    params_content = JSON.stringify(req.query, null, 4);
    params_path = path.join(__dirname, '..', 'public', 'params', `params_${date}.json`);
    fs.writeFile(params_path, params_content, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json({"ok": "ok"});
});

// for every other route, send the index.html
router.get('*', function (req, res, next) {
    request_path = req.path;
    console.log(request_path);
    const filePath = path.join(__dirname, '..', 'public', 'assets', request_path);
    fs.stat(filePath, function (err, stat) {
        if (err == null) {
            res.sendFile(filePath);
        } else if (err.code === 'ENOENT') {
            res.status(404).json({"404": "Not Found"});
        } else {
            next(err);
        }
    });
});

module.exports = router;
