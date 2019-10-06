//https://stackoverflow.com/questions/44643652/using-postgres-with-nodejs-for-connection-pool
//
const pg = require('pg');



// DB Config, this replaces the need for dotenv in NodeStarterguide
// get the pgURI item from the keys.js file 
const db = require('./config/keys').pgURI;

//https://node-postgres.com/features/connecting
const pool = new pg.Pool({
    connectionString: db
});


module.exports = pool;
