
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

//database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "locations"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

var port = process.env.por || 9009;

app.use(bodyParser.json());

app.route('/locations')
    .get(function (req, res) {
        connection.query("select location_name from location_info", function (err, result) {
            if (err) throw err;
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": result
            }));
        });
    });

app.listen(port, function () {
    console.log("Express server running on port %d", port);
});
