
//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');

// using Member Model
//const Account = require('../../models/Account');

// @router GET api/members
// @desc Get All Users
// @access public

//instead of app.get, we are in a router so use router.get
router.post('/', (req, res) => {
    //const sql_query = 'SELECT * FROM Users ORDER BY uname ASC';
    const sql_query = `INSERT INTO Feedback(giver, receiver, rating, add_remark,
        feedback_time) VALUES('${req.body.giver}', '${req.body.receiver}', 
        '${req.body.rating}', '${req.body.feedback}', '${req.body.timestamp}' )`;
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
