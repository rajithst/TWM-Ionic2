/**
 * Created by rajith on 3/7/17.
 */
const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Blogpost = require('../models/blog');
const SM = require('../models/socialmedia');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});




router.post('/submitpost',function (req,res) {


   const blogpost = new Blogpost({

        userid: req.body.userid,
        postTtile: req.body.postTitle,
        body: req.body.body,
        featured_img:req.body.featured_img,
        dateAdded: Date()
    });
    

    
    Blogpost.addBlogpost(blogpost,(err,callback)=>{

        if (err){
            res.json({alert:"btn btn-danger",msg:"Failed to submit the post"});
        }else{
            res.json({alert:"btn btn-success",msg:"Saved your blog post"});
        }

    })
    
    
});

router.get('/getPosts/:id',(req,res)=>{



    SM.getFollowers(req.params.id,(err,callback)=>{

        if (err){
            res.json({success:false,msg:"Failed"});
        }else{


            const usersArray = callback[0].followeusers;
            Blogpost.getFollowersPosts(usersArray,(err,docs)=>{

                if (err){
                    throw err
                }

                if (docs){

                     res.json({msg:true,data:docs})
                }

            })
        }

    })


});



module.exports = router;