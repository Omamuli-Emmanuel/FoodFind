//pull in dependencies 
const validator = require('validator');
const isEmpty = require('is-empty');


//export module function return statements 
module.exports = function validateRegisterInput(data){
    //create a container for errors 
    let error = {};

    //convert empty fields to empty strings so validator can work
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

   
    //check email for validaity
    if(validator.isEmpty(data.email)){
        error.email = "Email is required";
    }else if(!validator.isEmail(data.email)){
        error.email = "Email is invalid";
    }

    //check passwords for validity 
    if(validator.isEmpty(data.password)){
        error.password = "Password is required";
    }

    if(validator.isEmpty(data.password2)){
        error.password2 = "Confirm password field is required";
    }

    if(!validator.isLength(data.password, {min : 6, max : 30})){
        error.password = "Password must be at least 6 characters"
    }

    if(!validator.equals(data.password, data.password2)){
        error.password2 = "Passwords must match";
    }

    return{
        error, 
        isValid: isEmpty(error)
    };
};