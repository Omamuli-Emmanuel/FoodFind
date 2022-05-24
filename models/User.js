//get all required dependecies 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({ 
    email : {
        type : String, 
        required : true
    }, 
    password : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        default : Date.now
    }
});

//export the schema for use
module.exports = User = mongoose.model('admins', UserSchema);