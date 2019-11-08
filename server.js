const express = require('express');
const bodyParser = require('body-parser');


const accounts = require('./routes/api/accounts');
const settings = require('./routes/api/settings');
const jobs = require('./routes/api/jobs');
const members = require('./routes/api/members');
const drivers = require('./routes/api/drivers');
const ewallet = require('./routes/api/ewallet');
const bid = require('./routes/api/bid');

const app = express(); //boilerplate: initialize express into app


// boilerplate: bodyparser middleware
app.use(bodyParser.json());
       
app.use('/api/accounts', accounts);
app.use('/api/settings', settings);
app.use('/api/jobs', jobs);
app.use('/api/members', members);
app.use('/api/drivers', drivers);
app.use('/api/ewallet', ewallet);
app.use('/api/bid', bid);

// the first part is if you want to deploy
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started port ${port}`));






