/**
 * Created by rajith on 3/11/17.
 */
var SM = require('../models/socialmedia');

var mongoose = require('mongoose');
var config = require('../config/database');
mongoose.connect(config.database);

var socialmedia = [
    new SM({
        id:"1",
        provider:"x"
    })

];

var done = 0;
for (var i = 0; i < socialmedia.length; i++) {
    socialmedia[i].save(function (err, result) {
        done++;
        if (done === socialmedia.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
