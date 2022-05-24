const mongoose = require("mongoose");
const Schema = mongoose.Schema

const VendorSchema = new Schema({
    storeOwner : {
        type : String, 
        required : true
    },
    businessName : {
        type : String, 
        required :true
    }, 
    address : {
        type : String, 
        required : true
    }, 
    phone : {
        type : String, 
        required : true
    }, 
    storeType : {
        type : String,
        required : true
    }, 
    logo : {
        type : String, 
    }, 
    email : {
        type : String,
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    wallet : {
        type : Number, 
        required : true
    },
    date : {
        type : Date, 
        default : Date.now
    }
});

module.exports = Vendors = mongoose.model('vendors', VendorSchema);