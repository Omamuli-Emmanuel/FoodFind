//initialize dependencis
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')
const admin = require('./routes/api/users');
const vendor = require('./routes/api/vendors');




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
const db = require('./config/keys').mongoURI;



//connect to mongodb
mongoose.connect(db, {useNewUrlParser : true})
        .then(() => console.log("Connected successfully"))
        .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//routes
app.use('/api/users', admin);
app.use('/api/vendors', vendor);
// app.use('/api/users', vendorUsers);
// app.use('/api/users', endUsers);

//determine the port to run server on 
const port = process.env.PORT || 8000 
//listen on port for db data 
app.listen(port, () => console.log(`Sever running on port ${port}!`))