//get all required dependecies 
const { TrendingUpOutlined, TvRounded } = require('@material-ui/icons');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const MenuItems = new Schema({ 
    storeId : {
        type : String, 
        required : true
    },
    itemName : {
        type : String, 
        required : true
    },
    category : {
        type : String, 
        required : true
    }, 
    price : {
        type : String, 
        required : true
    },
   logo : {
        type : String, 
        required : true
    },
    info : {
        type : String, 
        required : true
    },
    date : {
        type : Date, 
        default : Date.now
    }
});

//export the schema for use
module.exports = User = mongoose.model('menuItems', MenuItems);