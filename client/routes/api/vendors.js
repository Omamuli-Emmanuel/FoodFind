const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keyse');


//load user model where we have our user schema
const Vendors = require('../../models/Vendors');
const AdminPercent = require('../../models/AdminPercentages')
const MenuItems = require('../../models/MenuItemss')


//database configuration
const db = require('../../config/keyse').mongoURI;
//create bland varaiable 
var database;

//load validation files for register and login
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


//Create Storage Engine for images
const storage = multer.diskStorage({
    destination : function(request, file, callback){
        callback(null, './client/public/uploads/images');
    }, 

    //add bac the extension
    filename:function(request, file, callback){
        callback(null,Date.now() + file.originalname)
    }
});

//store menu images
const menuStorage = multer.diskStorage({
    destination : function(request, file, callback){
        callback(null, './client/public/uploads/menuImages');
    }, 

    //add bac the extension
    filename:function(request, file, callback){
        callback(null,Date.now() + file.originalname)
    }
});

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

//upload parameters for multer
const upload = multer({
    storage:storage,
    limits : {
        fileSize : 1024*1024 * 3
    }
});

//upload parameters for multer
const menuStorageFormat = multer({
    storage:menuStorage,
    limits : {
        fileSize : 1024*1024 * 3
    }
});

//get admin percentage
router.get('/getAdminCut', (req, res) => {
    AdminPercent.find({}, function(err, result) {
        res.send(result)
    })
})

//route for creating new vendor
router.post('/admin/createVendor', upload.single('storeImage'), async(req, res) => {
    Vendors.find({email : req.body.email}, function(err, docs) {
        if(!docs.lenght){
           
            const newVendor = {
                logo : req.file.filename,
                storeOwner : req.body.storeOwner, 
                businessName : req.body.businessName,
                address : req.body.address,
                phone : req.body.phone,
                storeType : req.body.storeType,
                email : req.body.email,
                password : req.body.password,
                wallet : 0.00
            }
            Vendors.create(newVendor, function(err, vendorCreated) {
                if(err){
                    console.log(err);
                }else{
                    if(req.file === {} || req.file === null){
                        return res.status(404)
                    }else{
                        vendorCreated.photoId = req.file.filename;
                        
                        //hash password using bcrypt before uploading
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(vendorCreated.password, salt, (err, hash) => {
                        if(err) throw err ; 
                        vendorCreated.password = hash;
                        vendorCreated
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });

                    }
                    res.statusCode === 200? res.json("Vendor created successfully") : res.json("Oops! something went wrong, try again..")
                }
            })
        }else{
     
            res.send('This vendor already exisits')
        }
    });
})


//route for updating the vendor
router.put('/admin/updateVendor/:_id', upload.single('storeImage'), async(req, res) => {

    let newVendor = {
        _id : req.params._id,
        logo : req.file.filename,
        storeOwner : req.body.storeOwner, 
        businessName : req.body.businessName,
        address : req.body.address,
        phone : req.body.phone,
        storeType : req.body.storeType,
        email : req.body.email,
        password : req.body.password,
        wallet : req.body.wallet
    }

            //hash password using bcrypt before uploading
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newVendor.password, salt, (err, hash) => {
                    if(err) throw err ; 
                    newVendor.password = hash;
                    Vendors.updateOne({_id : req.params._id}, {$set : newVendor}, (err, result) =>{
                        console.log("Here and trying")
                        if(err){
                            res.send("Update failed for some reason")
                        }else{
                            res.statusCode === 200? res.json("Vendor updated successfully") : res.json("Oops! something went wrong, try again..")
                        }
                    })
                });
            });
})

router.post('/uploadMenu', menuStorageFormat.single('itemImage'), async(req, res) => {


    const { filename: image } = req.file;

    let newMenuItem = {
        logo : image,
        storeId : req.body.storeId,
        category : req.body.category, 
        itemName : req.body.itemName,
        price : parseInt(req.body.price),
        info : req.body.info
    }


    
       await sharp(req.file.path)
        .resize(300, 300)
        .jpeg({ quality: 90 })
        .png({quality : 90})
        .toFile(
            path.resolve(req.file.destination,'resized',image)
        )
        fs.unlinkSync(req.file.path)

    MenuItems.create(newMenuItem, function(err, menuCreated) {
        if(err){
            console.log(err);
        }else{
            if(req.file === {} || req.file === null){
                return res.status(404)
            }else{
                menuCreated.photoId = req.file.filename;
                menuCreated.save()
            }
            res.statusCode === 200? res.json("Menu created successfully") : res.json("Oops! something went wrong, try again..")
        }
    })
})

//get menu from db
router.get('/getMenu/:vendorId', (req, res) => {
    MenuItems.find({storeId : req.params.vendorId}, function (err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

//get menu from db
router.get('/getMenu/', (req, res) => {
    MenuItems.find({}, function (err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

//get menu count
router.get('/getMenuCount/:vendorId', (req, res) => {
    MenuItems.countDocuments({"storeId" : req.params.vendorId}, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.send(result.toString());
        }
    })
})

//route for vendor login
router.post('/vendorLogin', (req, res) => {
    const {error, isValid} = validateLoginInput(req.body);
    //validate the login form
    if(!isValid){
        return res.status(400).json(error);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find the user's email
    Vendors.findOne({email}).then(user => {
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
})

//route to get all vendors 
router.get('/listVendors', (req, res) => {
    Vendors.find({}, function (err, docs) {
        if(err){
            console.log("failed to fetch data")
        }else{
            res.send(docs)
        }
    })
})

//route to get all vendors 
router.get('/countVendors', (req, res) => {
    Vendors.estimatedDocumentCount({}, function(err, result) {
        if(err){
            res.send(err)
        }else{
            res.send(result.toString())
        }
    }) 
})

//route to get single vendor 
router.get('/getVendor/:_id', (req, res) => {
    Vendors.find({_id : req.params._id}, function (err, docs) {
        if(err){
            console.log("failed to fetch data")
        }else{
            res.send(docs)
        }
    })
})

//route to delete single vendor 
router.delete('/deleteVendor/:_id', (req, res) => {
    //const image = '../../client/public/uploads/images/'+req.params.logo;
   
    Vendors.deleteOne({_id : req.params._id}, function (err, result) {
        if(err){
            console.log("failed to fetch data")
        }else{
              res.send("Vendor deleted successfully")
        }
    })
})

router.delete('/deleteItem/:_id', (req, res) => {
    MenuItems.deleteOne({_id : req.params._id}, function (err, result){
        if(err){
            console.log("failed to delete item");
        }else{
            res.send("Item deleted successfully")
        }
    })
})

module.exports = router;