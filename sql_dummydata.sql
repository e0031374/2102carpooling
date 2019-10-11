
DROP TABLE IF EXISTS Accounts;
CREATE TABLE Accounts (
  uname     varchar(50) PRIMARY KEY,
  pass      varchar(256) NOT NULL
);

INSERT INTO Accounts VALUES ('root', 'password');
INSERT INTO Accounts VALUES ('user', 'password');
INSERT INTO Accounts VALUES ('rogers', 'password');
INSERT INTO Accounts VALUES ('stark', 'password');
INSERT INTO Accounts VALUES ('romanoff', 'password');
SELECT * FROM Accounts;

DROP TABLE IF EXISTS Passengers;
CREATE TABLE Passengers (
  uname     varchar(50) PRIMARY KEY REFERENCES Accounts (uname) ON DELETE CASCADE
);
SELECT * FROM Passengers;

DROP TABLE IF EXISTS Drivers;
CREATE TABLE Drivers (
  uname     varchar(50) PRIMARY KEY REFERENCES Accounts (uname) ON DELETE CASCADE,
  license   text NOT NULL --primarykey as well
);

DROP TABLE IF EXISTS Advertizers;
CREATE TABLE Advertizers (
  uname     varchar(50) PRIMARY KEY REFERENCES Accounts (uname) ON DELETE CASCADE
);



