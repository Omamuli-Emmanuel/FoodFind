//get required dependencies user route
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keyse');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

//load validation files for register and login
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load user model where we have our user schema
const Admin = require('../../models/Users');
const AdminPercentage = require('../../models/AdminPercentages');
const Category = require('../../models/Categorys');

//Create Storage Engine for categories
const catImages = multer.diskStorage({
    destination : function(request, file, callback){
        callback(null, './client/public/uploads/catImages');
    }, 

    //add bac the extension
    filename:function(request, file, callback){
        callback(null,Date.now() + file.originalname)
    }
});

//upload parameters for multer
const goCatImage = multer({
    storage:catImages,
    limits : {
        fileSize : 1024*1024 * 3
    }
});



// @route POST api/users/register
// @desc Register user
// @access Public

const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        console.log("You need to be logged in to view this page")
    }else{
        jwt.verify(token, keys.secretOrKey, (err, decoded) => {
            if(err){
                res.json({auth: false, message : "Authentication failed"})
            }else{
                req.id = decoded._id
                next();
            }
        })
    }
}

//consfirm auth status
router.get('/authStatus', verifyJwt, (req,res) => {
    res.send("Authenticated")
})


//register admin
router.post('/adminRegister', (req, res) => {
    //validate the regster form 
 
    const{error, isValid} = validateRegisterInput(req.body);

    //check validation status
    //this here is to check if inputs is not valid
    if(!isValid){
        return res.status(400).json(error);
    }

    //if input is valid, check to see if that user already exisits in the database
    Admin.findOne({email : req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email : "Email already exisits"});
        }else{
            const newUser = new Admin({ 
                email : req.body.email,
                password : req.body.password
            });

            //hash password using bcrypt before uploading
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err ; 
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public


//login admin
router.post("/adminLogin", (req, res) => {

    const {error, isValid} = validateLoginInput(req.body);
    //validate the login form
    if(!isValid){
        return res.status(400).json(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find the user's email
    Admin.findOne({email}).then(user => {
        //check if user exists 
        if(!user){
            return res.status(404).json({emailnotfound : 'User not found'});
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                // User matched
                //Create JWT Payload
                const payload = {
                    id : user.id, 
                    name : user.name
                }

                //get JWT for sign in
            const accessToken = jwt.sign(payload, keys.secretOrKey,{ expiresIn : 300}
                );
                res.json({auth: true, token: accessToken, result: user})
            }else{
                return res.status(400).json({passwordinsorrect: "Password incorrect"});
            }
        });
    });
});

//get admin percentage from db
router.get("/adminpercent", (req,res) => {
    AdminPercentage.findOne({}, function(err, doc) {
        if(err){
            console.log("Failed to read value")
        }else{
            res.send(doc)
        }
    })
})

//update admin percentage by adding
router.put("/updateAdminPercentageAdd", (req, res) => {

    let newPercent = {
        percentage : req.body.percentage + 1
    }

    AdminPercentage.updateOne({}, {$set : newPercent}, function(err, result){
        if(err){
            console.log("could not update admin percentage");
        }else{
            res.send("Admin Percentage Updated Successfully");
        }
    })
})

//update admin percentage by subtracting
router.put("/updateAdminPercentageSubtract", (req,res) => {
    let newPercent = {
        percentage : req.body.percentage - 1
    }

    AdminPercentage.updateOne({}, {$set : newPercent}, function(err, result){
        if(err){
            console.log("could not update admin percentage");
        }else{
            res.send("Admin Percentage Updated Successfully");
        }
    })
})

//upload category
router.post('/addCategory', goCatImage.single('catImage'), async(req, res) => {

    const { filename: image } = req.file;

    let newCategory = {
        logo : image,
        vendorType : req.body.vendorType, 
        category : req.body.category,
    }
    
       await sharp(req.file.path)
        .resize(150, 80)
        .jpeg({ quality: 90 })
        .png({quality : 90})
        .toFile(
            path.resolve(req.file.destination,'resized',image)
        )
        fs.unlinkSync(req.file.path)

    Category.create(newCategory, function(err, catCreated) {
        if(err){
            console.log(err);
        }else{
            if(req.file === {} || req.file === null){
                return res.status(404)
            }else{
                catCreated.photoId = req.file.filename;
                catCreated.save()
            }
            res.statusCode === 200? res.json("Category created successfully") : res.json("Oops! something went wrong, try again..")
        }
    })
})

router.get('/pullCategories', (req, res) => {
    Category.find({}, function(err, doc) {
        if(err){
            res.send('error fetching categories');
        }else{
            res.send(doc);
        }
    })
})

router.get('/deleteCategory/:_id', (req, res) => {
    Category.deleteOne({_id: req.params._id}, function(err, result) {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})



module.exports = router;