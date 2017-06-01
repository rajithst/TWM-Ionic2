/**
 * Created by rajith on 3/3/17.
 */
/**
 * Created by rajith on 2/25/17.
 */

const  mongoose = require('mongoose');
const config = require('../config/database');
const schema = mongoose.Schema;

var businesspageSchema = new schema({

    userid:{type:Number},
    pagename:{type:String},
    businesstype:{type:String},
    pageimage:{type:String},
    targetareas:{type:String}
});



const Bpage =  module.exports = mongoose.model('Bpage',businesspageSchema);

module.exports.addBpagedata = function (BusinessPage,callback) {

    BusinessPage.save(callback);
};

