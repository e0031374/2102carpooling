
//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Member Model
//const Account = require('../../models/Account');

// @router GET api/ewallet
// @desc Get balance of user
// @access public

//instead of app.get, we are in a router so use router.get
router.get('/:uname', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `SELECT * FROM ewallet WHERE uname='${req.params.uname}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        //console.log(data);
        console.log(sql_query);
        console.log(data.rows);
        if (data.rows.length >= 1) {
            res.status(200).json({success: true, obj: data.rows[0]});
        } else {
            res.status(400).json({success: false, msg: 'invalid credentials'});
        }
    });
});

router.post('/', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const insertAmt = parseFloat(req.body.amount) + parseFloat(req.body.balance);
    const sql_query = `UPDATE Ewallet SET balance=${insertAmt} WHERE uname='${req.body.uname}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        console.log(data);
        res.status(200).json({success: true, msg: "inserted"});
    });
});
module.exports = router;
