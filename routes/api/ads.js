//use express router
const express = require('express');
const pool = require('../../database');
const router = express.Router();
const bodyParser = require('body-parser');
const availableJobs = require('../../dummydata/availableJobs');

router.get("/", (req, res) => {
    const sql_query = 'SELECT * FROM Advertisement WHERE ridedate IS NULL;'
    pool.query(sql_query, (err,data) => {
        if (err) {
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({ success: true, ads: data.rows});
    });
})

router.post("/", (req, res) => {
    const { advertiser, misc_advert } = req.body;
    const sql_query = `INSERT INTO Advertisement(advertiser, ridedate, start_time, est_trip_time, origin, destination, misc_advert) VALUES('${advertiser}', null, null, null, null, null, '${misc_advert}')`;
    const feedback_query = 'SELECT * FROM Advertisement WHERE ridedate IS NULL;'
    console.log("-----------ad----------------");
    console.log(sql_query);
    pool.query(sql_query, (err,data) => {
        if (err) {
            throw err;
        }
        console.log(data.rows);
        pool.query(feedback_query, (err,data) => {
            if (err) {
                throw err;
            }
            console.log(data.rows);
            res.status(200).json({ success: true, ads: data.rows});
        });
    });
})

router.get("/feature1", (req, res) => {
    const sql_query = "SELECT A.uname, COUNT(*) AS num_posted FROM Advertiser A INNER JOIN Advertisement AD ON A.uname = AD.advertiser GROUP BY A.uname";
    pool.query(sql_query, (err,data) => {
        if (err) {
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({ success: true, stats1: data.rows});
    });
})

router.get("/feature2", (req, res) => {
    const sql_query = "WITH        won_adverts AS ("
        + "SELECT D.drivername, COUNT(*) AS total_rides                    FROM "
        + "Driver D INNER JOIN Bid B                    ON D.drivername "
        + "= B.drivername                    GROUP BY D.drivername"
        + "),            calculate_rating AS (                        "
        + "SELECT D.drivername, 1.0 * SUM(F.rating) AS sum_rating, 1.0 * "
        + "COUNT(*) AS num_rating                        FROM Driver D "
        + "INNER JOIN Feedback F                        ON D.drivername "
        + "= F.receiver                        GROUP BY "
        + "D.drivername                    )        SELECT W.drivername, "
        + "W.total_rides,  (C.sum_rating / C.num_rating) AS avg_rating         "
        + "FROM won_adverts W INNER JOIN calculate_rating C          "
        + " ON W.drivername = C.drivername          "
        + " GROUP BY W.drivername, W.total_rides, avg_rating";
    pool.query(sql_query, (err,data) => {
        if (err) {
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({ success: true, stats2: data.rows});
    });
})


router.get("/feature3", (req, res) => {
    const sql_query = "WITH    complete_bids AS (        SELECT U.uname, COUNT(*) AS total_bids        FROM Users U INNER JOIN Bid B        ON U.uname = B.bidder         GROUP BY U.uname    ),    fare_amount AS (        SELECT C.uname, COUNT(*) AS won_bids, SUM(H.fare) AS total_fares        FROM complete_bids C INNER JOIN History H        ON C.uname = H.passenger        GROUP BY C.uname    )    SELECT C.uname, C.total_bids, F.won_bids, F.total_fares, (F.total_fares / F.won_bids) AS avg_fares    FROM complete_bids C INNER JOIN fare_amount F    ON C.uname = F.uname    GROUP BY C.uname, C.total_bids, F.won_bids, F.total_fares";
    //const sql_query = "WITH "
        //+ "complete_bids AS ( "
        //+ "            SELECT U.uname, COUNT(*) AS total_bids "
        //+ "            FROM Users U INNER JOIN Bid B "
        //+ "            ON U.uname = B.bidder "
        //+ "            GROUP BY U.uname "
        //+ "        ), "
        //+ "    fare_amount AS ( "
        //+ "                SELECT C.uname, COUNT(*) AS won_bids, SUM(H.fare) AS total_fares "
        //+ "                FROM complete_bids C INNER JOIN History H "
        //+ "                ON C.uname = H.passenger "
        //+ "                GROUP BY C.uname "
        //+ "            ) "
    
        //+ "SELECT C.uname, C.total_bids, F.won_bids, F.total_fares, (F.total_fares / F.won_bids) AS avg_fares "
        //+ "FROM complete_bids C INNER JOIN fare_amount F "
        //+ "ON C.uname = F.uname "
        //+ "GROUP BY C.uname, C.total_bids, F.won_bids, F.total_fares;WITH "
        //+ "complete_bids AS ( "
        //+ "            SELECT U.uname, COUNT(*) AS total_bids "
        //+ "            FROM Users U INNER JOIN Bid B "
        //+ "            ON U.uname = B.bidder "
        //+ "            GROUP BY U.uname "
        //+ "        ), "
        //+ "    fare_amount AS ( "
        //+ "                SELECT C.uname, COUNT(*) AS won_bids, SUM(H.fare) AS total_fares "
        //+ "                FROM complete_bids C INNER JOIN History H "
        //+ "                ON C.uname = H.passenger "
        //+ "                GROUP BY C.uname "
        //+ "            ) "
    
        //+ "SELECT C.uname, C.total_bids, F.won_bids, F.total_fares, (F.total_fares / F.won_bids) AS avg_fares "
        //+ "FROM complete_bids C INNER JOIN fare_amount F "
        //+ "ON C.uname = F.uname"
        //+ "GROUP BY C.uname, C.total_bids, F.won_bids, F.total_fares";
    console.log(sql_query);
    pool.query(sql_query, (err,data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(data.rows);
        res.status(200).json({ success: true, stats3: data.rows});
    });
})




module.exports = router;
