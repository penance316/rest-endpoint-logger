var express = require('express'),
    moment = require('moment'),
    winston = require('winston'),
    bodyParser = require('body-parser');

// Setup windston logging to include datetime
var logger = new winston.Logger({
    level:      'info',
    transports: [
        new (winston.transports.Console)({
            timestamp: function () {
                return moment().format('hh:mm:ss a');
            },
            formatter: function (options) {
                // Return string will be passed to logger.
                return options.timestamp() + ' : ' + options.level.toUpperCase() + ' : ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
            }
        }),
        new (winston.transports.File)({filename: 'logfile.log'})
    ]
});

var app = express();

app.set('port', process.env.PORT || 3000);

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));

app.post('/test', function (req, res) {

    logger.info(req.body);

    res.sendStatus(200);
});


app.listen(3000, function () {
    logger.info('Example app listening on port ' + app.get('port'));
});
