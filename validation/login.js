//pull in all dependencies 
const validator = require('validator');
const isEmpty = require('is-empty');

//export the module return function statement
module.exports = function validateLoginInput(data){
    let error = {};

    //convert empty fields to empty strings
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //check email for validaity
    if(validator.isEmpty(data.email)){
        error.email = "Email is required";
    }else if(!validator.isEmail(data.email)){
        error.email = "Email is invalid";
    }

    //check password
    if(validator.isEmpty(data.password)){
        error.password = "Password is required";
    }

    return {
        error, 
        isValid : isEmpty(error)
    };
};
