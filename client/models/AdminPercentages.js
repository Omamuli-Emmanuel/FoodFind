const mongoose = require("mongoose");
const Schema = mongoose.Schema

const AdminPercentage = new Schema({
    percentage : {
        type : Number, 
        required : true
    },
});

module.exports = Vendors = mongoose.model('adminPercentage', AdminPercentage);