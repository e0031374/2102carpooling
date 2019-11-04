
//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');


// NOTE: if you try to insert a duplicate it crashes
//  i just want it to work rn first, before putting in safegiards

// @router POST api/settings/passengers
// @desc link Account to Passenger subclass
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/passengers', (req, res) => {
    const insert_query = 'INSERT INTO Passengers(uname) VALUES($1)';
    console.log(req.body);

    const param = [req.body.uname];
    console.log(param);
    //not allowed to send multiple queries
    pool.query(insert_query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        //console.log(data);
        res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname});
    });
});

// @router POST api/settings/drivers
// @desc link Account to Passenger subclass
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/drivers', (req, res) => {
    const insert_query = 'INSERT INTO Drivers(uname, license) VALUES($1, $2)';

    const param = [req.body.uname, req.body.license];
    console.log(param);
    //not allowed to send multiple queries
    pool.query(insert_query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname, license: req.body.license});
    });
});

// @router POST api/settings/advertizers
// @desc link Account to Advertizers subclass
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/advertizers', (req, res) => {
    const insert_query = 'INSERT INTO advertizers(uname) VALUES($1)';

    const param = [req.body.uname];
    console.log(param);
    //not allowed to send multiple queries
    pool.query(insert_query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname });
    });
});

//instead of app.get, we are in a router so use router.get
router.get('/:uname/', (req, res) => {
    const sql_query = `SELECT DISTINCT A.uname AS uname, 
    (CASE 
        WHEN P.uname IS NOT NULL THEN true
        WHEN P.uname IS NULL THEN false
    END ) AS ispassenger,
    (CASE 
        WHEN D.uname IS NOT NULL THEN true
        WHEN D.uname IS NULL THEN false
    END ) AS isdriver,    
    (CASE 
        WHEN Ad.uname IS NOT NULL THEN true
        WHEN Ad.uname IS NULL THEN false
    END ) AS isad   
FROM (((Accounts A LEFT JOIN Passengers P ON A.uname=P.uname) 
    LEFT JOIN Drivers D ON A.uname=D.uname)
    LEFT JOIN Advertizers Ad ON A.uname=Ad.uname)
WHERE A.uname=$1`;
    console.log(sql_query);

    const param = [req.params.uname];
    pool.query(sql_query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        //console.log(data);
        console.log(sql_query);
        console.log(data.rows);
        if (data.rows.length >= 1) {
            const {uname, ispassenger, isdriver, isad} = data.rows[0];
            res.status(200).json({success: true, uname, ispassenger, isdriver, isad});
        } else {
            res.status(400).json({success: false, msg: 'invalid credentials'});
        }
        //res.json(data.rows)
    });
});

// @router POST api/settings/resetpass
// @desc returns current password given a corrent previously used password
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/resetpass', (req, res) => {
    const query = 'given a previous password, return current if exist';

    const param = [req.body.uname];
    console.log(param);
    //not allowed to send multiple queries
    pool.query(query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        res.status(200).json({success: true, msg: 'recover success', pass: req.body.pass});
    });
});

module.exports = router;
