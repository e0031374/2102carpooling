
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
    const insert_query = 'INSERT INTO Driver(drivername, licensenum) VALUES($1, $2)';

    const param = [req.body.uname, req.body.license];
    console.log(param);
    //not allowed to send multiple queries
    pool.query(insert_query, param, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(req.body);
        res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname, license: req.body.license});
    });
});

// @router POST api/settings/advertizers
// @desc link Account to Advertizers subclass
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/advertizers', (req, res) => {
    const insert_query = 'INSERT INTO advertiser(uname) VALUES($1)';

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
    const uname = req.params.uname;
    const sql_query = `SELECT * FROM (SELECT CASE WHEN EXISTS(SELECT 1 FROM driver d WHERE u.uname = d.drivername) THEN true ELSE false END AS is_driver FROM users u WHERE u.uname = $1) AS X, (SELECT CASE WHEN EXISTS(SELECT 1 FROM advertiser a WHERE u.uname = a.uname) THEN true ELSE false END AS is_advertiser FROM users u WHERE u.uname = $1) AS Y`;
//    const sql_query = `SELECT DISTINCT A.uname AS uname, 
//    (CASE 
//        WHEN P.uname IS NOT NULL THEN true
//        WHEN P.uname IS NULL THEN false
//    END ) AS ispassenger,
//    (CASE 
//        WHEN D.uname IS NOT NULL THEN true
//        WHEN D.uname IS NULL THEN false
//    END ) AS isdriver,    
//    (CASE 
//        WHEN Ad.uname IS NOT NULL THEN true
//        WHEN Ad.uname IS NULL THEN false
//    END ) AS isad   
//FROM (((Accounts A LEFT JOIN Passengers P ON A.uname=P.uname) 
//    LEFT JOIN Drivers D ON A.uname=D.uname)
//    LEFT JOIN Advertizers Ad ON A.uname=Ad.uname)
//WHERE A.uname=$1`;
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
            //const {uname, ispassenger, isdriver, isad} = data.rows[0];
            const {is_driver, is_advertiser} = data.rows[0];
            res.status(200).json({success: true, uname, isdriver: is_driver, isad: is_advertiser});
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

// @router POST api/settings/changepass
// @desc returns current password given a corrent previously used password
// @access public

//in Postman, Headers: key: content-type; values: json
router.post('/changepass', (req, res) => {
    const sql_query = `SELECT uname FROM Users WHERE uname='${req.body.uname}' AND upassword='${req.body.pass}'`;
    const history_query = `INSERT INTO PasswordHistory(uname, oldpass) VALUES('${req.body.uname}' ,'${req.body.newpass}')`;
    const update_query = `UPDATE Users SET upassword='${req.body.newpass}' 
        WHERE uname='${req.body.uname}'`;

    console.log(sql_query);
    console.log(history_query);
    console.log(update_query);
    //not allowed to send multiple queries
    if (req.body.pass == req.body.newpass) {
        res.status(400).json({success: false, uname:`${req.body.uname}`, msg: `oldpassword cannot be the same as new password`});
    }

    pool.query(sql_query, (err,data) => {
        if (err) {
            res.status(400).json({success: false, uname:`${req.body.uname}`});
            console.log("user verification failed");
            console.log(err);
            throw err;
        }
        //console.log(data);
       console.log("user verification success");
        pool.query(history_query, (err,data) => {
            if (err) {
                res.status(400).json({success: false, uname:`${req.body.uname}`, 
                    msg: "new password is the same as one old password"});
                console.log("history insert failed");
                console.log(err);
                throw err;
            }
            console.log("history insert success");
            //console.log(data);
            pool.query(update_query, (err,data) => {
                if (err) {
                    console.log("user update failed");
                    res.status(400).json({success: false, uname:`${req.body.uname}`, 
                        msg: "new user update failure"});
                    console.log(err);
                    throw err;
                }
                console.log("user update success");
                res.status(200).json({success: true, msg: 'insert success', uname: req.body.uname});
            } );
        } );
    });
});

module.exports = router;
