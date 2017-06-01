/**
 * Created by rajith on 3/11/17.
 */

const  mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;

var socialMeadia = new schema({

    id:{type:String},
    provider:{type:String},
    followeusers:{type:Array},
    followpages:{type:Array},
    profilepicture:{type:String},
    name:{type:String}
});



const SM =  module.exports = mongoose.model('SM',socialMeadia);




module.exports.checkId = function (id,provider,pic,name,callback) {

    const query1 = {id:id,provider:provider};
    const query = {id:id,provider:provider,profilepicture:pic,name:name};

        console.log(query);

    SM.findOne(query1,function (err,docs) {
             if (err) throw err;

             if (docs){
                 callback(null,docs);
             }
             if (!docs){

                 newentry = new SM(query);
                 newentry.save(function (err,docs) {

                     if (err) throw err;
                     if (docs){
                         callback(null,docs);
                     }
                 })
             }

         });

};

module.exports.followOption = function (myid,followersId,callback) {


    SM.findOneAndUpdate({id: myid},{$push:{followeusers:followersId}},function (err,docs) {
        if (err) throw err;

        if (docs){
            callback(null,docs);
        }


    });

};

module.exports.getFollowers = function (myid,callback) {

    SM.find({id: myid},{ followeusers: 1, profilepicture: 1 },function (err,docs) {
        if (err) throw err;

        if (docs){
            callback(null,docs);
        }


    });

};