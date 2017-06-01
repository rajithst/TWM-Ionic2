/**
 * Created by rajith on 3/3/17.
 */
/**
 * Created by rajith on 2/25/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Bpage = require('../models/businesspages');
const config = require('../config/database');


//register

router.post('/createpage',function (req,res,next) {

    var BusinessPage = new Bpage({

        userid:req.body.id,
        pagename:req.body.pagename,
        businesstype:req.body.businesstype,
        pageimage:req.body.pageimage,
        targetareas:req.body.targetareas

    });


    Bpage.addBpagedata(BusinessPage,function (err,docs) {
        if (err){
            res.json({success:false,msg:"Failed to create page"});
        }else{
            console.log(docs);
            res.json({success:true,msg:"Successfully created page"});
        }
    })

});


//profile
router.get('/profile',passport.authenticate('jwt',{session:false}),function (req,res,next) {

    //console.log(req.user);
    res.json({user:req.user});

});


module.exports = router;