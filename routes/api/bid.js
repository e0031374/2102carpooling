
//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Member Model
//const Account = require('../../models/Account');

// @router GET api/bid
// @desc Get balance of user
// @access public

//instead of app.get, we are in a router so use router.get
router.get('/:uname', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `SELECT * FROM bid WHERE uname='${req.params.uname}'`;
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

router.post('/passengers', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const {bidder, advertid, drivername, bid_amount, balance} = req.body;
    const insert_query = `INSERT INTO Bid (bidder, advertid, drivername, bid_time, bid_amount, balance, is_win)
    VALUES ('${bidder}', ${advertid}, '${drivername}', now(), ${parseFloat(bid_amount)}, ${parseFloat(balance)}, FALSE);`;
    const check_query = `SELECT * FROM Bid WHERE bidder='${bidder}' AND advertid=${advertid}`
    pool.query(check_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(check_query);
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        if (data.rows.length >= 1) {
            res.status(400).json({success: false, msg: "bid already exists"});
        }
    });

    pool.query(insert_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(insert_query);
            console.log(err);
            throw err;
        }
        console.log(data);
        res.status(200).json({success: true, msg: "inserted"});
    });
});

router.get('/passengers/:bidder', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    //const check_query = `SELECT * FROM Bid WHERE bidder='${req.params.bidder}' AND is_win=true`;
    const check_query = `SELECT * FROM Bid INNER JOIN Advertisement ON Bid.advertid=Advertisement.advertid WHERE Bid.bidder='${req.params.bidder}' AND Bid.is_win=true ORDER BY ridedate DESC;`;
    pool.query(check_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(check_query);
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({success: true, bids: data.rows});
    });
});

module.exports = router;
