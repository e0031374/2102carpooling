//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Member Model
//const Account = require('../../models/Account');
//
router.get('/car/:uname', (req, res) => {
    const sql_query = `SELECT * FROM Car WHERE carowner='${req.params.uname}'`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        console.log("-------------------------------------------");
        res.status(200).json({success: true, car: data.rows});
    });
});

router.post('/car', (req, res) => {
    const { uname, platenum, brand, model, colour, seatnum } = req.body;
    const sql_query = `INSERT INTO Car(platenum, carowner, brand, model, colour, 
        seatnum) VALUES('${platenum}', '${uname}' ,'${brand}', '${model}', 
        '${colour}', '${seatnum}')`;

    const insert_query = `INSERT INTO Drives(uname, platenum) VALUES('${uname}', '${platenum}')`;


    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(sql_query);
            console.log(err);
            throw err;
        }
        console.log(data);

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
});

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
    const get_query = `SELECT * FROM Driver WHERE drivername='${req.body.uname}'`;
    const sql_query = `INSERT INTO Insurance(insuranceowner, policynum, 
        insuranceprovider) VALUES('${req.body.uname}', '${req.body.policynum}', 
        '${req.body.insuranceProvider}')`;
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log("-------------------------------------------");
            console.log(sql_query);
            console.log(err);
            console.log("insert insurance failure");
            throw err;
        }
        console.log("insert insurance success");
        console.log(data);
        pool.query(get_query, (err,data) => {
            if (err) {
                console.log("-------------------------------------------");
                console.log(get_query);
                console.log(err);
                console.log("get driver failure");
                throw err;
            }
            console.log("get driver success");
            console.log(data);
            const { drivername, licensenum} = data.rows[0];
            const insert_query = `UPDATE Driver SET policynum='${req.body.policynum}' WHERE drivername='${drivername}' AND licensenum='${licensenum}'`;
            console.log(insert_query);
            console.log("------------122---------------");
            pool.query(insert_query, (err,data) => {
                if (err) {
                    console.log("-------------------------------------------");
                    console.log(insert_query);
                    console.log(err);
                    console.log("update driver failure");
                    throw err;
                }
                console.log("update driver success");
                console.log(data);
                res.status(200).json({success: true, msg: "inserted"});
            });
        });
    });
});

module.exports = router;
