var express = require('express'),
    moment = require('moment'),
    bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: false}));

app.post('/test', function (req, res) {

    // print to console
    console.log(moment().format('hh:mm:ss a '));
    console.log(req.body);

    // just call res.end(), or show as string on web
    res.sendStatus(200);
});


app.listen(3000, function () {
    console.log('Example app listening on port ' + app.get('port'));
});
