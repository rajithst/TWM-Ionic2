/**
 * Created by rajith on 4/24/17.
 */
const express = require('express');
const router = express.Router();
const SM = require('../models/socialmedia');


router.post('/FollowOption',function (req,res) {

    const myid = req.body.myid;
    const followersId = req.body.followid;

    SM.followOption(myid,followersId,function (err,docs) {
        if (err) throw err;

        if (docs){

            res.json(docs)
        }



    });

});


router.get('/search/:section/:text',function (req,res) {
    

    const  section= req.params.section;
    const text = req.params.text;

    SM.getresults(section,text,function (err,docs) {
        if (err) throw err;

        if (docs){

            res.json(docs)
        }



    });

});

module.exports = router;