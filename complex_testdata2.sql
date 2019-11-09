DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS PasswordHistory CASCADE;
DROP TABLE IF EXISTS RecommendedDriver CASCADE;
DROP TABLE IF EXISTS Driver CASCADE;
DROP TABLE IF EXISTS Drives CASCADE;
DROP TABLE IF EXISTS Car CASCADE;
DROP TABLE IF EXISTS Advertiser CASCADE;
DROP TABLE IF EXISTS Advertisement CASCADE;
DROP TABLE IF EXISTS Ewallet CASCADE;
DROP TABLE IF EXISTS Insurance CASCADE;
DROP TABLE IF EXISTS InsuranceCompany CASCADE;
DROP TABLE IF EXISTS History CASCADE;
DROP TABLE IF EXISTS Area CASCADE;
DROP TABLE IF EXISTS Feedback CASCADE;
DROP TABLE IF EXISTS Bid CASCADE;
DROP TABLE IF EXISTS Passenger CASCADE;

CREATE TABLE Users (
    uname       VARCHAR(100),
    upassword   VARCHAR(50) NOT NULL,
    /* ccnum       BIGINT NOT NULL UNIQUE, */
	PRIMARY KEY (uname),
    CHECK (length(upassword)>=4),
    CHECK (length(uname)>=4)
);

CREATE TABLE PasswordHistory (
    uname VARCHAR(100) NOT NULL,
    oldpass VARCHAR(50) NOT NULL,
    PRIMARY KEY (uname, oldpass),
    FOREIGN KEY (uname) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (length(oldpass) >= 4)
);

CREATE TABLE InsuranceCompany (
    cname       VARCHAR(100) UNIQUE,
    contactnum  VARCHAR(100),
    PRIMARY KEY(cname, contactnum)
    );

CREATE TABLE Insurance (
    insuranceowner  VARCHAR(50),
    policynum       VARCHAR(100) UNIQUE,
    insuranceprovider VARCHAR(50),
    PRIMARY KEY(insuranceowner, policynum),
    FOREIGN KEY (insuranceOwner) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (insuranceprovider) REFERENCES InsuranceCompany(cname)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );

CREATE TABLE Driver (
	drivername	 	VARCHAR(100) UNIQUE,
    licensenum  VARCHAR(15),
    policynum   VARCHAR(50),
	PRIMARY KEY (drivername, licensenum),
    FOREIGN KEY (drivername) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (policynum) REFERENCES Insurance(policynum)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE RecommendedDriver (
    drivername  VARCHAR(100),
    avg_rating  DECIMAL(3,1),
    PRIMARY KEY (drivername),
    FOREIGN KEY (drivername) REFERENCES Driver(drivername)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );

CREATE TABLE Car (
    platenum    VARCHAR(10) UNIQUE,
    carowner    VARCHAR(100),
    brand       VARCHAR(50) NOT NULL,
    model       VARCHAR(50) NOT NULL,
    colour      VARCHAR(50) NOT NULL,
    seatnum     INTEGER NOT NULL,
    PRIMARY KEY(platenum, carowner),
    FOREIGN KEY (carowner) REFERENCES Driver(drivername)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Drives (
    uname       VARCHAR(100),
    platenum    VARCHAR(10),
    PRIMARY KEY (uname, platenum),
    FOREIGN KEY (uname) REFERENCES Driver(drivername)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (platenum) REFERENCES Car(platenum)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Advertiser (
	uname	 	VARCHAR(100) ,
	PRIMARY KEY (uname),
	FOREIGN KEY (uname) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Area (
    areaname   VARCHAR(100),
    PRIMARY KEY (areaname)
    );

CREATE TABLE Advertisement (
    advertid        SERIAL,
    advertiser      VARCHAR(100),
    ridedate        DATE,
    start_time      TIME,
    est_trip_time   INTEGER,
    origin          VARCHAR(100),
    destination     VARCHAR(100),
    misc_advert     VARCHAR(200),
    PRIMARY KEY (advertid, advertiser),
    FOREIGN KEY (advertiser) REFERENCES Advertiser(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (origin) REFERENCES Area(areaname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (destination) REFERENCES Area(areaname)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE Ewallet (
    uname       VARCHAR(100),
    ccnum       BIGINT NOT NULL UNIQUE,
    balance     DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(uname, balance),
    FOREIGN KEY(uname) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );

CREATE TABLE Bid(
    bidder      VARCHAR(100),
    advertid    INT,
    drivername  VARCHAR(100),
    bid_time    TIMESTAMP NOT NULL,
    bid_amount  DECIMAL(10,2) NOT NULL,
    balance     DECIMAL(10,2) NOT NULL,
    is_win      BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (bidder, advertid, bid_amount),
    FOREIGN KEY (bidder) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (advertid, drivername) REFERENCES Advertisement(advertid, advertiser)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (bidder, balance) REFERENCES Ewallet(uname, balance)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (bid_amount>0),
    CHECK (balance >= bid_amount)
    );

CREATE TABLE Feedback(
    giver       VARCHAR(100) NOT NULL,
    receiver    VARCHAR(100),
    rating      INTEGER,
    add_remark  VARCHAR(100),
    feedback_time TIMESTAMP NOT NULL,
    PRIMARY KEY (giver, receiver, feedback_time),
    FOREIGN KEY (giver) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (receiver) REFERENCES Users(uname)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CHECK (rating >= 0 AND rating <= 10),
    CHECK (giver <> receiver)
    );

CREATE TABLE History (
    passenger       VARCHAR(100),
    advertid        INT,
    fare            DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (passenger, advertid),
    FOREIGN KEY (passenger,advertid,fare) REFERENCES Bid(bidder, advertid, bid_amount)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );

/* Update balance of the wallets */
CREATE OR REPLACE FUNCTION update_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Ewallet
        SET balance = balance + NEW.bid_amount
        WHERE uname = NEW.drivername;
    UPDATE Ewallet
        SET balance = balance - NEW.bid_amount
        WHERE uname = NEW.bidder;
RAISE NOTICE 'Bid won! Wallet updated...';
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_bidder_wallet ON Bid;
CREATE TRIGGER update_bidder_wallet
    AFTER UPDATE
    ON Bid
    FOR EACH ROW
    WHEN (OLD.is_win = FALSE AND NEW.is_win = TRUE)
    EXECUTE PROCEDURE update_balance();

/* Raises exception on duplicate username and duplicate old password */
DROP TRIGGER IF EXISTS no_duplicate_user ON Users;
CREATE OR REPLACE FUNCTION create_user() RETURNS TRIGGER AS $$
    BEGIN
        IF EXISTS(SELECT 1 FROM Users a WHERE a.uname = NEW.uname AND TG_OP = 'INSERT') THEN
            RAISE EXCEPTION 'Username % exists! Choose a new username', NEW.uname;
        END IF;
        IF EXISTS(SELECT 1 FROM PasswordHistory p WHERE p.uname = NEW.uname
            AND NEW.upassword = p.oldpass AND TG_OP = 'UPDATE') THEN
            RAISE EXCEPTION 'Password change failed, do not use old passwords.';
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER no_duplicate_user
    BEFORE INSERT OR UPDATE ON Users
    FOR EACH ROW
    EXECUTE PROCEDURE create_user();


/* Adds or removes recommended drivers */
DROP TRIGGER IF EXISTS check_recommendations ON Feedback;
CREATE OR REPLACE FUNCTION determine_recommendation()
RETURNS TRIGGER AS $$
    BEGIN
        IF EXISTS (SELECT * FROM RecommendedDriver r WHERE r.drivername = NEW.receiver) THEN
            UPDATE RecommendedDriver
            SET avg_rating = new_avg.avg
            FROM
                (SELECT AVG(rating) AS avg, f.receiver
                    FROM Feedback AS f
                    GROUP BY f.receiver
                    HAVING f.receiver = NEW.receiver) AS new_avg
            WHERE drivername = NEW.receiver;
        ELSE
            RAISE NOTICE 'Driver % is now a recommended driver.', NEW.receiver;
            INSERT INTO RecommendedDriver (drivername, avg_rating)
                SELECT NEW.receiver, COALESCE(AVG(rating),0) AS average_haha
                FROM Feedback
                WHERE receiver = NEW.receiver;
        END IF;
        DELETE FROM RecommendedDriver
        WHERE drivername in (SELECT drivername FROM RecommendedDriver
                            GROUP BY drivername, avg_rating
                            HAVING avg_rating < 7);
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_recommendations
AFTER INSERT on Feedback
FOR EACH ROW
EXECUTE PROCEDURE determine_recommendation();

CREATE OR REPLACE FUNCTION add_advertiser()
RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO Advertiser VALUES (NEW.drivername);
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_advertiser
AFTER INSERT ON Driver
FOR EACH ROW
EXECUTE PROCEDURE add_advertiser();


INSERT INTO Users VALUES ('keanelooi', 'yixian45');
INSERT INTO Users VALUES ('hongwei', 'limcoder89');
INSERT INTO Users VALUES ('cheeyang', 'tehholy0ne');
INSERT INTO Users VALUES ('yangyang', 'kingsavatar');
INSERT INTO Users VALUES ('haein', 'jungmaste');
INSERT INTO Users VALUES ('royston', 'bridge4life');
INSERT INTO Users VALUES ('nokia', 'bestbrick');

INSERT INTO Ewallet VALUES ('cheeyang', '4000', '100.00');
INSERT INTO Ewallet VALUES ('nokia', '11111', '150.00');
INSERT INTO Ewallet VALUES ('keanelooi', '5000', '1000.00');
INSERT INTO Ewallet VALUES ('hongwei', '1000', '205.00');

INSERT INTO Driver (drivername, licensenum) VALUES ('haein', '00000000A');
INSERT INTO Driver (drivername, licensenum) VALUES ('royston', '1111111B');
INSERT INTO Driver (drivername, licensenum) VALUES ('keanelooi', '22222222C');


INSERT INTO Advertiser (uname) VALUES ('royston');
INSERT INTO Advertiser (uname) VALUES ('keanelooi');
INSERT INTO Advertiser (uname) VALUES ('haein');

INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'royston', 'test1');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'royston', 'test2');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'keanelooi', 'test3');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'keanelooi', 'test4');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'keanelooi', 'test5');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'keanelooi', 'test6');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'haein', 'test7');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'haein', 'test8');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'haein', 'test9');
INSERT INTO Advertisement ( advertiser, misc_advert) VALUES (  'haein', 'test10');

INSERT INTO Area (areaname) VALUES ('Marina Bay');
INSERT INTO Area (areaname) VALUES ('Raffles Place');
INSERT INTO Area (areaname) VALUES ('Tanjong Pagar');
INSERT INTO Area (areaname) VALUES ('Marina Center');
INSERT INTO Area (areaname) VALUES ('Sentosa');
INSERT INTO Area (areaname) VALUES ('Outram');
INSERT INTO Area (areaname) VALUES ('Rochor');
INSERT INTO Area (areaname) VALUES ('Newton');
INSERT INTO Area (areaname) VALUES ('River Valley');
INSERT INTO Area (areaname) VALUES ('Bukit Timah');
INSERT INTO Area (areaname) VALUES ('Holland Road');
INSERT INTO Area (areaname) VALUES ('Tanglin');
INSERT INTO Area (areaname) VALUES ('Novena');
INSERT INTO Area (areaname) VALUES ('Thomson');
INSERT INTO Area (areaname) VALUES ('Bishan');
INSERT INTO Area (areaname) VALUES ('Bukit Merah');
INSERT INTO Area (areaname) VALUES ('Geylang');
INSERT INTO Area (areaname) VALUES ('Kallang');
INSERT INTO Area (areaname) VALUES ('Marina Parade');
INSERT INTO Area (areaname) VALUES ('Queenstown');
INSERT INTO Area (areaname) VALUES ('Southern Island');
INSERT INTO Area (areaname) VALUES ('Toa Payoh');
INSERT INTO Area (areaname) VALUES ('Central Water Catchment');
INSERT INTO Area (areaname) VALUES ('Lim Chu Kang');
INSERT INTO Area (areaname) VALUES ('Mandai');
INSERT INTO Area (areaname) VALUES ('Sembawang');
INSERT INTO Area (areaname) VALUES ('Simpang');
INSERT INTO Area (areaname) VALUES ('Sungei Kadut');
INSERT INTO Area (areaname) VALUES ('Woodlands');
INSERT INTO Area (areaname) VALUES ('Yishun');
INSERT INTO Area (areaname) VALUES ('Ang Mo Kio');
INSERT INTO Area (areaname) VALUES ('Hougang');
INSERT INTO Area (areaname) VALUES ('North-Eastern Islands');
INSERT INTO Area (areaname) VALUES ('Punggol');
INSERT INTO Area (areaname) VALUES ('Seletar');
INSERT INTO Area (areaname) VALUES ('Sengkang');
INSERT INTO Area (areaname) VALUES ('Serangoon');
INSERT INTO Area (areaname) VALUES ('Bukit Batok');
INSERT INTO Area (areaname) VALUES ('Bukit Panjang');
INSERT INTO Area (areaname) VALUES ('Boon Lay');
INSERT INTO Area (areaname) VALUES ('Choa Chu Kang');
INSERT INTO Area (areaname) VALUES ('Clementi');
INSERT INTO Area (areaname) VALUES ('Jurong East');
INSERT INTO Area (areaname) VALUES ('Jurong West');
INSERT INTO Area (areaname) VALUES ('Tengah');
INSERT INTO Area (areaname) VALUES ('Tuas');
INSERT INTO Area (areaname) VALUES ('Western Islands');
INSERT INTO Area (areaname) VALUES ('Western Water Catchment');
INSERT INTO Area (areaname) VALUES ('Benoi');
INSERT INTO Area (areaname) VALUES ('Ghim Moh');
INSERT INTO Area (areaname) VALUES ('Gul');
INSERT INTO Area (areaname) VALUES ('Pandan Gardens');
INSERT INTO Area (areaname) VALUES ('Jurong Island');
INSERT INTO Area (areaname) VALUES ('Kent Ridge');
INSERT INTO Area (areaname) VALUES ('Nanyang');
INSERT INTO Area (areaname) VALUES ('Pioneer');
INSERT INTO Area (areaname) VALUES ('Pasir Laba');
INSERT INTO Area (areaname) VALUES ('Teban Gardens');
INSERT INTO Area (areaname) VALUES ('Toh Tuck');
INSERT INTO Area (areaname) VALUES ('Tuas South');
INSERT INTO Area (areaname) VALUES ('West Coast');

INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'royston', '8 Nov 2019', '10:00', '30', 'Bishan', 'Clementi');
INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'royston', '8 Nov 2019', '10:50', '35', 'Clementi', 'Sentosa');
INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'keanelooi', '8 Nov 2019', '11:00', '20', 'Bishan', 'Marina Bay');
INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'keanelooi', '8 Nov 2019', '12:00', '10', 'Marina Bay', 'River Valley');
INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'keanelooi', '8 Nov 2019', '13:00', '15', 'River Valley', 'Clementi');
INSERT INTO Advertisement ( advertiser, ridedate, start_time, est_trip_time, origin, destination) VALUES ( 'haein', '8 Nov 2019', '14:00', '60', 'Bishan', 'Jurong East');

INSERT INTO Bid VALUES ('cheeyang', '11', 'royston', '2019-11-08 09:00:23', '10.00', '100.00', TRUE);
INSERT INTO Bid VALUES ('nokia', '12', 'royston', '2019-11-08 09:50:23', '15.00', '150.00', TRUE);
INSERT INTO Bid VALUES ('hongwei', '13', 'keanelooi', '2019-11-08 09:40:23', '200.00', '205.00', TRUE);
INSERT INTO Bid VALUES ('cheeyang', '14', 'keanelooi', '2019-11-08 11:00:23', '20.00', '100.00', TRUE);
INSERT INTO Bid VALUES ('nokia', '15', 'keanelooi', '2019-11-08 09:10:23', '30.00', '150.00', TRUE);
INSERT INTO Bid VALUES ('cheeyang', '16', 'haein', '2019-11-08 12:00:23', '10.00', '100.00', FALSE);

INSERT INTO History VALUES ('cheeyang', '11', '10.00');
INSERT INTO History VALUES ('nokia', '12', '15.00');
INSERT INTO History VALUES ('hongwei', '13', '200.00');
INSERT INTO History VALUES ('cheeyang', '14', '20.00');
INSERT INTO History VALUES ('nokia', '15', '30.00');


INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('cheeyang', 'keanelooi', '9', '2019-10-10 10:20:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('haein', 'keanelooi', '5', '2019-10-10 10:30:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('cheeyang', 'haein', '4', '2019-10-10 10:40:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('cheeyang', 'royston', '7', '2019-10-10 10:50:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('royston', 'keanelooi', '10', '2019-10-10 20:20:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('nokia', 'keanelooi', '8', '2019-10-10 15:20:08');
INSERT INTO Feedback (giver, receiver, rating, feedback_time) VALUES ('yangyang', 'keanelooi', '6', '2019-10-11 10:20:08');

INSERT INTO RecommendedDriver VALUES ('keanelooi', '7.9');
INSERT INTO RecommendedDriver VALUES ('royston', '5.8');
INSERT INTO RecommendedDriver VALUES ('haein', '10.0');

INSERT INTO InsuranceCompany VALUES('Aviva', '1234');
INSERT INTO InsuranceCompany VALUES('Great Eastern', '2234');
INSERT INTO InsuranceCompany VALUES(
'NTUC', '3234');
INSERT INTO InsuranceCompany VALUES('DBS', '4234');
INSERT INTO InsuranceCompany VALUES('BOC', '5678');


INSERT INTO Insurance(insuranceowner, policynum, insuranceprovider) VALUES('haein','bbb1111','Aviva');
INSERT INTO Insurance(insuranceowner, policynum, insuranceprovider) VALUES('royston','cccc2222','NTUC');
INSERT INTO Insurance(insuranceowner, policynum, insuranceprovider) VALUES('keanelooi','ddddd3333','Great Eastern');

UPDATE Driver SET policynum='bbb1111' WHERE drivername='haein' AND licensenum='00000000A';
UPDATE Driver SET policynum='cccc2222' WHERE drivername='royston' AND licensenum='1111111B';
UPDATE Driver SET policynum='cccc2222' WHERE drivername='keanelooi' AND licensenum='22222222C';

INSERT INTO Car(platenum, carowner, brand, model, colour, seatnum) VALUES('aaa1111','haein','Toyota', 'Model S', 'yellow', '5');
INSERT INTO Car(platenum, carowner, brand, model, colour, seatnum) VALUES('eeee3333','royston','BMW', 'Civic', 'green', '7');
INSERT INTO Car(platenum, carowner, brand, model, colour, seatnum) VALUES('ffff4444','keanelooi','Honda', 'Beetle', 'purple', '2');

INSERT INTO Drives(uname, platenum) VALUES ('haein', 'aaa1111');
INSERT INTO Drives(uname, platenum) VALUES ('royston', 'eeee3333');
INSERT INTO Drives(uname, platenum) VALUES ('keanelooi', 'ffff4444');

INSERT INTO PasswordHistory(uname, oldpass) VALUES ('keanelooi', 'yixian45');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('hongwei', 'limcoder89');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('cheeyang', 'tehholy0ne');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('yangyang', 'kingsavatar');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('haein', 'jungmaste');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('royston', 'bridge4life');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('nokia', 'bestbrick');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('keanelooi', 'password');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('hongwei', 'password');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('cheeyang', 'password');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('yangyang', 'password');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('haein', 'password');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('royston', 'root');
INSERT INTO PasswordHistory(uname, oldpass) VALUES ('nokia', 'root');

-- Feature 1
SELECT A.uname, COUNT(*) AS num_posted
FROM Advertiser A INNER JOIN Advertisement AD
ON A.uname = AD.advertiser
GROUP BY A.uname;

--Feature 2
WITH
    won_adverts AS (
        SELECT D.drivername, COUNT(*) AS total_rides
        FROM Driver D INNER JOIN Bid B
        ON D.drivername = B.drivername
        GROUP BY D.drivername
    ),
    calculate_rating AS (
        SELECT D.drivername, 1.0 * SUM(F.rating) AS sum_rating, 1.0 * COUNT(*) AS num_rating
        FROM Driver D INNER JOIN Feedback F
        ON D.drivername = F.receiver
        GROUP BY D.drivername
    )
    SELECT W.drivername, W.total_rides,  (C.sum_rating / C.num_rating) AS avg_rating
    FROM won_adverts W INNER JOIN calculate_rating C
    ON W.drivername = C.drivername
    GROUP BY W.drivername, W.total_rides, avg_rating;

--Feature 3
WITH
    complete_bids AS (
        SELECT U.uname, COUNT(*) AS total_bids
        FROM Users U INNER JOIN Bid B
        ON U.uname = B.bidder 
        GROUP BY U.uname
    ),
    fare_amount AS (
        SELECT C.uname, COUNT(*) AS won_bids, SUM(H.fare) AS total_fares
        FROM complete_bids C INNER JOIN History H
        ON C.uname = H.passenger
        GROUP BY C.uname
    )

    SELECT C.uname, C.total_bids, F.won_bids, F.total_fares, (F.total_fares / F.won_bids) AS avg_fares
    FROM complete_bids C INNER JOIN fare_amount F
    ON C.uname = F.uname
    GROUP BY C.uname, C.total_bids, F.won_bids, F.total_fares;
