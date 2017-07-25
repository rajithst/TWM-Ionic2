    /**
     * Created by rajith on 2/25/17.
     */
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const request = require("request");

    // rest client

    const Client = require('node-rest-client').Client;
    const client = new Client();



    const User = require('../models/users');
    const SM = require('../models/socialmedia');
    const config = require('../config/database');


    //register

    router.post('/register',function (req,res) {
        var newUser = new User({
            name : req.body.name,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password

        });

        User.addUser(newUser,function (err,user) {
            if (err){
                res.json({success:false,msg:"Failed to register User"});
            }else{
                res.json({success:true,msg:"Successfully registered User"});
            }
        })

    });

    //authenticate
    router.post('/authenticate',function (req,res) {

        const  email = req.body.email;
        const  password = req.body.password;


        User.getUserByemail(email,function (err,user) {
            if(err) throw err;

            if(!user){
                res.json({success:false,msg:"No User Found"});
            }

            User.comparePassword(password,user.password,function (err,isMatch) {

                if (err) throw err;
                if(isMatch){
                    const token = jwt.sign(user,config.secret,{
                        expiresIn:604800
                    });
                    res.json({
                        success:true,
                        token:"JWT "+ token,
                        user:{
                            id:user._id,
                            name:user.name,
                            email:user.email,
                            username:user.username
                        }});

                }else{
                    res.json({success:false,msg:"Password Does not match"});

                }
            })

        })

    });


    router.post('/checkid',function (req,res) {

            if(Object.keys(req.body).length >=5) {

                SM.checkId(req.body.id, req.body.provider, req.body.profilepic, req.body.name, function (err, match) {
                    if (err) throw err;
                    if (match) {

                        var options = {
                            method: 'POST',
                            url: 'https://travelproject.auth0.com/oauth/token',
                            headers: {'content-type': 'application/json'},
                            body: '{"client_id":"8cfUH0JgfwIwXfMJwH1jSPh6q0KlubWw","client_secret":"EuDgEwp7sxP_v8oiDN4oXOYKo32qKyeKbsn0_bsL6ZyRt5y-fKN-bDk5w63OsGQF","audience":"https://travelproject.auth0.com/api/v2/","grant_type":"client_credentials"}'
                        };
                        request(options, function (error, response, body) {

                            const accessToken = JSON.parse(body).access_token;
                            const type = JSON.parse(body).token_type;


                            const opts = {
                                method: 'GET',
                                url: 'https://travelproject.auth0.com/api/v2/users/' + req.body.userid,
                                headers: {
                                    Authorization: type + " " + accessToken

                                }
                            };

                            request(opts, function (error, response, body) {

                                const databody = JSON.parse(body);
                                databody.personal = match;

                                let hometown = databody.hometown;

                                if (hometown == undefined) {

                                    let district = ["kandy", 'Galle', 'Rathnapura', 'Kegalle', 'Mathara', 'Colombo', 'Badulla'];
                                    let districtitem = Math.floor(Math.random() * 5) + 1;
                                    let disname = district[districtitem];

                                    let places = ["visiting places", "tourist places", "top sights", "tourist attraction"];
                                    let item = Math.floor(Math.random() * 3) + 1;
                                    let keyword = places[item];

                                    client.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + disname + keyword + "&key=AIzaSyD1wsxf68A21P1FVZyMBeop5X3io-2MH_E", function (data, response) {

                                        databody.nearby = data;

                                        res.json({success: true, data: databody});

                                    });

                                } else {
                                    let hometown = databody.hometown.name;
                                    let places = ["visiting places", "tourist places", "top sights", "tourist attraction"];
                                    let item = Math.floor(Math.random() * 3) + 1;
                                    let keyword = places[item];

                                    client.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + hometown + keyword + "&key=AIzaSyBhvuK4j4q0eXP_CBxUmRFpW9Ki7N55Il4", function (data, response) {


                                        databody.nearby = data;
                                        res.json({success: true, data: databody});

                                    });
                                }

                            });


                        });

                    }

                });
            }

    });

    //profile
    router.get('/profile',passport.authenticate('jwt',{session:false}),function (req,res) {
        res.json({user:req.user});

    });

    //validate
    router.get('/validate',function (req,res) {

    res.send('validate');

});

module.exports = router;
