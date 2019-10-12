//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');
const availableJobs = require('../../dummydata/availableJobs');

// @router GET api/jobs
// @desc fetch all available jobs to be post onto passenger screen
// @access public
router.get("/passengers/:uname", (req, res) => {
    console.log(availableJobs);
    console.log(req);
    res.status(200).json({ uname: req.params.uname, jobs: availableJobs});
})

module.exports = router;
