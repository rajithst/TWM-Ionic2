/**
 * Created by rajith on 2/25/17.
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 3000;


const users = require('./routes/users');
const profile = require('./routes/profile');
const blog = require('./routes/blog');
const UserOption = require('./routes/userOptions');
const googleService = require('./routes/googleService');


const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on("connected",function(){
    console.log("connected to  " + config.database);
});

mongoose.connection.on("error",function(err){
    console.log("error to connect  " + err);
});

app.use(cors());
app.use(express.static(path.join(__dirname,"pp")));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));




//passport middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//routes
app.use('/users',users);
app.use('/users/option',UserOption);
app.use('/profile',profile);
app.use('/blog',blog);
app.use('/googleAPI',googleService);

app.get('/',function(req,res){
   res.send('index page');

});


app.listen(port, function(){
    console.log("server started on port"+port);
});
