const express = require('express'),
    app = express(),
    port = 8088;

const bodyParser = require('body-parser');
require(__dirname + '/server/connectDB');
const bookRouter = require(__dirname + '/server/routes/book');

app.use(function logRequestStart(req, res, next) {
    // console.info(`${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode}`)
    });

    next()
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));

app.use(express.static(__dirname + '/app'));
app.use('/api/', bookRouter);

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Server start at http://localhost:${port}`);
