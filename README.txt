
Project for CS2102
Server entrypoint is named: server.js
everything else is in routes/ directory

Client entrypoint is at: 

/client/src/index.js --default stuff
/client/src/App.js 
    everything else is in /client/components

/client/src/store.js --redux store
    the following supports the use of redux:
    /client/reducers
    /client/actions



Postgres backend needs to be linked to server
note, for this to work 
include the following file
this prevents leaking of keys onto github

complex_testdata2.sql is what was most recently used to test this thing
server_routes_directory indicates what the server is doing



./config/keys.js

module.exports = {
    pgURI: 'postgres://user:password@host_address:port/database_name'
}


