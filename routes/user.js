

var express = require('express');
var app = express();
var router = express.Router();
var pg = require('pg');
var randomstring = require('randomstring');
var jwt = require('json-web-token');
var os = require('os');
var dns = require('dns');


var payload = {
    "iss": "my_issurer",
    "aud": "World",
    "iat": 1400062400223,
    "typ": "/online/transactionstatus/v2",
    "request": {
        "myTransactionId": "[myTransactionId]",
        "merchantTransactionId": "[merchantTransactionId]",
        "status": "SUCCESS"
    }
};

var secret = 'TOPSECRETTTTT';
var thistoken;
// encode 
jwt.encode(secret, payload, function (err, token) {
    if (err) {
        console.error(err.name, err.message);
    } else {
        console.log(token);
        thistoken = token;


    }
});


jwt.decode(secret, thistoken, function (err, decodedPayload, decodedHeader) {
    if (err) {
        console.error(err.name, err.message);
    } else {
        console.log("decoded payload-> " + JSON.stringify(decodedPayload), "decoded header-> " + JSON.stringify(decodedHeader));
    }
});






console.log("process.argv[0]-> "+process.argv[0]+"process.argv[1]-> "+process.argv[1]+"  process.argv[2]->"+ process.argv[2]);

var connectionString = "postgres://myrole:myrole@localhost/reciepebookdb";

router.get('/:id', (req, res, next) => {
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            console.error("error connecting posgres")
        }

        // console.log("id in server-> "+req.params.id);
        client.query("SELECT * FROM reciepes where id=" + req.params.id, (err, result) => {
            if (err) {
                console.error("error executing query");
                console.dir("hello");
            }
            // console.log(result.rows[0]);

            console.log("search by id request - > " + result.rows);
            if (result.rows == "") {
                console.log("noidfound");
                res.json({ "noidfound": "noidfound" });
            }
            else {
                console.log("id found");
                res.json(result.rows);
            }
            done();
        });
    })
})




router.get("/", (req, res, next) => {

    

    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            return console.error("error connecting POSGRES");
        }
        console.log("user route");
        client.query("select * from reciepes", (err, result) => {
            if (err) {
                console.error("error executing query");
            }
            // console.log(result.rows[0]);
            res.json(result.rows);
            done();
        });
    });
});

router.post('/', (req, res, next) => {
    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            console.error("error connecting posgres")
        }
        console.log("post service");
        // console.log("body name:- "+req.body.name);
        client.query("INSERT INTO reciepes(name,rollno,directions) values($1,$2,$3)",
            [req.body.name, req.body.rollno, req.body.direction])

        client.query("select * from reciepes", (err, result) => {
            if (err) {
                console.error("error executing query");
            }
            // console.log(result.rows[0]);
            res.json(result.rows);
            done();
        });
        done();
    })
})


router.put('/', (req, res, next) => {

    console.log(req.url);
    console.log("put body request-> " + req.body.id, req.body.name, req.body.rollno, req.body.direction);

    pg.connect(connectionString, (err, client, done) => {
        if (err) {
            console.error("error connecting posgres");
        }
        // console.log("id in server-> "+req.params.id);
        var updatequery = "UPDATE reciepes SET name=($1),rollno=($2),directions=($3) where id =($4)";
        client.query(updatequery, [req.body.name, req.body.rollno, req.body.direction, req.body.id], (err, result) => {
            if (err) {
                console.error("error executing query");
            }

            client.query("select * from reciepes", (err, result) => {
                if (err) {
                    console.error("error executing query");   
                }
                // console.log(result.rows[0]);
                res.json(result.rows);
                done();
            });
            done();
        });
    })
})



module.exports = router;