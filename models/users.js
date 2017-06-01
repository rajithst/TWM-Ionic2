/**
 * Created by rajith on 2/25/17.
 */

const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;

var userSchema = new schema({


    name:{type:String},
    email:{type:String},
    username:{type:String},
    password:{type:String}

});

const User =  module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = function (id,callback) {

    User.findById(id,callback);
};

module.exports.getUserByemail = function (email,callback) {
    const query = {email:email};
    User.findOne(query,callback);
};

module.exports.addUser = function (newUser,callback) {
    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(newUser.password,salt, function (err,hash) {
            if(err) throw err;

            newUser.password = hash;
            newUser.save(callback);
        });
    });

};

module.exports.comparePassword = function (passwrod,hash,callback) {
    bcrypt.compare(passwrod, hash, function(err, isMatch) {
        if(err) throw err;
        if(isMatch){

            callback(null,isMatch);
        }else{
            callback(null,false);
        }
    });
};

