
const express = require('express');
const router = express.Router();

// rest client

const Client = require('node-rest-client').Client;
const client = new Client();


router.get('/getSights',function (req,res) {

    const city = req.body.myid;
    const followersId = req.body.followid;

    SM.followOption(myid,followersId,function (err,docs) {
        if (err) throw err;

        if (docs){

            res.json(docs)
        }



    });

});


router.get('/getplaces/:place',(req,res)=>{

    var city = req.params.place;
    client.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+city+"&types=(cities)&key=AIzaSyD1wsxf68A21P1FVZyMBeop5X3io-2MH_E", function (data, response) {

        if (data){
            res.json({state:true,data:data})
        }

    });


})

module.exports = router;