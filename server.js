//initialize dependencis
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const admin = require('./client/routes/api/users');
const vendor = require('./client/routes/api/vendors');
const path = require('path');

// const vendorUsers = require('./vendors/routes/api/users');
// const endUsers = require('./endUsers/routes/api/users');

const app = express();

//body parser middleware
app.use(
    bodyParser.urlencoded({
        extended : false
    })
);
//use cors
app.use(cors());

app.use(bodyParser.json());

//database configuration
const db = require('./client/config/keyse').mongoURI;

//connect to mongodb
mongoose.connect(db, {useNewUrlParser : true})
        .then(() => console.log("Connected successfully"))
        .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use('/api/users', admin);
app.use('/api/vendors', vendor);
// app.use('/api/users', vendorUsers);
// app.use('/api/users', endUsers);


app.get('*', async(req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

//passport config
require('./client/config/passporte')(passport);


//determine the port to run server on 
// const port = process.env.PORT || 8000 
//listen on port for db data 
app.listen(8000, () => console.log('Sever running on and running'))