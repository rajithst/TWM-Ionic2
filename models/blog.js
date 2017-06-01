/**
 * Created by rajith on 3/7/17.
 */


const  mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;
var async = require('async');
var fs = require('fs');
var blogSchema = new schema({

    userid:{type:String},
    postTtile:{type:String},
    body:{type:String},
    featured_img:{type:String},
    dateAdded:{type:String}
});



const Blogtab =  module.exports = mongoose.model('Blogtab',blogSchema);

module.exports.addBlogpost = function (PostData,callback) {

    var dt=new Date();
    var text = "featured_image_";
    var pos=PostData.featured_img.indexOf(",");

    var base64d=PostData.featured_img.substring(pos+1);
    var path="./uploads/images/blog/featured/"+text+"_"+PostData.userid+"_"+dt+".png";

    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
            return console.log(err);
        }

    });


    PostData.featured_img = "../uploads/images/blog/featured/"+text+"_"+PostData.userid+"_"+dt+".png";
    PostData.save(callback);
};


module.exports.getFollowersPosts = (usersArray,callbacl)=>{

    var results = [];

    async.each(usersArray,function (item,callback) {

          Blogtab.find({userid:item})
                .sort({'dateAdded': -1})
                 .exec(function(err,docs){

            if (docs){

                  results.push(docs);
                  callback();

            }else{
                callback();
            }

        });

    }, function(err){

        console.log(results);
        callbacl(null,results)
    });

};