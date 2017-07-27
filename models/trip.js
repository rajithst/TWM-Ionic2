const  mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;
var async = require('async');
var fs = require('fs');
var TripSchema = new schema({
    name:{type:String},
    waypoints:{type:String},
    from:{type:String},
    to : {type:String}
     

});



const Triptab =  module.exports = mongoose.model('Triptab',TripSchema);

module.exports.addTrip = function (newTrip,callback) {

     Triptab.create(newTrip,callback);

}


module.exports.getTrip = function (callback) {
     
    Triptab.find(callback);
};