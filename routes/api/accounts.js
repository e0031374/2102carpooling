
//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Account Model
//const Account = require('../../models/Account');

// @router GET api/accounts
// @desc Get All Accounts
// @access public

//instead of app.get, we are in a router so use router.get
router.get('/', (req, res) => {
    const sql_query = 'SELECT * FROM accounts ORDER BY uname ASC';
    pool.query(sql_query, (err,data) => {
        if (err) {
            throw err;
        }
        //console.log(data);
        res.json(data.rows)
    });
});

//instead of app.get, we are in a router so use router.get
router.get('/:uname/:pass', (req, res) => {
    const sql_query = `SELECT uname FROM Accounts WHERE uname='${req.params.uname}' AND pass='${req.params.pass}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        //console.log(data);
        console.log(sql_query);
        console.log(data.rows);
        if (data.rows.length >= 1) {
            res.status(200).json({success: true, uname:`${data.rows[0].uname}`});
        } else {
            res.status(400).json({success: false, msg: 'invalid credentials'});
        }
        //res.json(data.rows)
    });
});

// @router POST api/accounts
// @desc Create a new account
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/', (req, res) => {
    const insert_query = `INSERT INTO Accounts(uname, pass) VALUES('${req.body.uname}' ,'${req.body.pass}')`;
    console.log(insert_query);

    pool.query(insert_query, (err,data) => {
        if (err) {
            throw err;
        }
        //console.log(data);
        res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname});
    });
});

// @router DELETE api/accounts
// @desc Deletes an account
// @access public

//in Postman, Headers: key: content-type; values: json
//look, i perfectly understand how unsafe it is to allow
//  deletion of account based on http header, 
//  but really this is just
//  to practice ok? cut me some slack
router.delete('/:uname', (req, res) => {
    const del_query = `DELETE FROM Accounts WHERE uname='${req.params.uname}'`;
    console.log(del_query);

    pool.query(del_query, (err,data) => {
        if (err) {
            res.status(404).json({success: false, msg: err});
            throw err;
        }
        //console.log(data);
        res.status(200).json({success: true, msg: 'delete success or row not found'});
    });
});



//instead of app.get, we are in a router so use router.get
router.get('/forgot/:uname/:pass', (req, res) => {
    // change this sql_query
    const sql_query = `SELECT uname FROM Accounts WHERE uname='${req.params.uname}' AND pass='${req.params.pass}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        //console.log(data);
        console.log(sql_query);
        console.log(data.rows);
        if (data.rows.length >= 1) {
            // another search query for the actual password
            res.status(200).json({success: true, uname:`${data.rows[0].uname}`});
        } else {
            res.status(400).json({success: false, msg: 'invalid credentials'});
        }
        //res.json(data.rows)
    });
});
module.exports = router;
