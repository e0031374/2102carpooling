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

// @router GET api/jobs
// @desc fetch all available jobs that the driver has 
// @access public
router.get("/drivers/:uname", (req, res) => {
    const userJobs = availableJobs.filter(job => {
	return job.uname === req.params.uname
    });	
    console.log(availableJobs);
    console.log(req);
    res.status(200).json({ uname: req.params.uname, jobs: userJobs});
})

// @router DELETE api/jobs
// @desc delete one driver job based on uname and startDateTime
// @access public
router.delete("/drivers/", (req, res) => {
    const userJobs = availableJobs.filter(job => {
	return job.uname === req.params.uname
    });	
    console.log(req);
    res.status(200).json({ 
	success: true, uname: req.body.uname, jobs: userJobs
    });
})

// @router POST api/jobs
// @desc add a driver job to Availability
// @access public
router.post("/drivers/", (req, res) => {
    const driverRouteCheck = (body) => {
        const output = body.uname === ""
	   ||  body.startDateTime === ""
	   ||  body.endDateTime === ""
	   ||  body.start === ""
	   ||  body.end === ""
	   ||  body.car === "";
	return ! output;
    }
    console.log(req.body);
    if (driverRouteCheck(req.body)) {
    	res.status(200).json({ 
    	    success: true, uname: req.body.uname, jobs: req.body.job
    	});
    } else {
    	res.status(500).json({ 
    	    success: false, uname: req.body.uname, msg: "invalid body"
    	});
    }
})

module.exports = router;
