const express = require('express');
const bodyParser = require('body-parser');


const accounts = require('./routes/api/accounts');

const app = express(); //boilerplate: initialize express into app


// boilerplate: bodyparser middleware
app.use(bodyParser.json());
       
app.use('/api/accounts', accounts);

// the first part is if you want to deploy
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started port ${port}`));






