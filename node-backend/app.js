const express =require('express');
const  bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const conf = require('./conf/db');

var connection = mongoose.connect(conf.db);

if(connection){
    console.log("connected")
}else {
    console.log("error in mongodb")
}


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());





app.listen(port,()=>{
    console.log("listening to port " + port);
});