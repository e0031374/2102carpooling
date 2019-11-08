//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Member Model
//const Account = require('../../models/Account');

// @router GET api/drivers/insurance
// @desc Get All insurance companies
// @access public

//instead of app.get, we are in a router so use router.get
router.get('/insurance', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `SELECT * FROM InsuranceCompany`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({success: true, insuranceCompanies: data.rows});
    });
});

router.get('/insurance/:uname', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `SELECT * FROM Insurance WHERE insuranceowner='${req.params.uname}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        console.log("-------------------------------------------");
        res.status(200).json({success: true, insurance: data.rows});
    });
});

//instead of app.get, we are in a router so use router.get
router.post('/insurance', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `INSERT INTO Insurance(insuranceowner, policynum, 
        insuranceprovider) VALUES('${req.body.uname}', '${req.body.policynum}', 
        '${req.body.insuranceProvider}')`;
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
