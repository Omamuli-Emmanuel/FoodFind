//get all required dependecies 
const { TrendingUpOutlined, TvRounded } = require('@material-ui/icons');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const Categories = new Schema({ 
    category : {
        type : String, 
        required : true
    },
   vendorType : {
        type : String, 
        required : true
    },
    logo : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        default : Date.now
    }
});

//export the schema for use
module.exports = User = mongoose.model('categories', Categories);