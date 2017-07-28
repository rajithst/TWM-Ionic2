import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from "../post/post";
import { AuthService } from '../../service/auth.service';
import { BlogServiceService } from "../../service/blog-service.service";
import { Login } from '../../pages/login/login';
import { Auth } from '../../providers/auth';
import {  AlertController, Platform } from 'ionic-angular';
/**
 * Generated class for the Articles page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  providers: [AuthService,BlogServiceService],
  selector: 'page-articles',
  templateUrl: 'articles.html',
})
export class Articles {
 splash = true;
 tabBarElement:any;
  x:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private BlogService:BlogServiceService,
    private authService: AuthService,public auth:Auth,public alert: AlertController,public platform: Platform) {

       this.tabBarElement = document.querySelector('.tabbar')
          this.x = this.auth.authenticated();

  }
    user: any;
  profile: any;
  userid:any;
  friends:any;
  nearby:any;
  results:any;
  followers:any;
  posts:any;
  postid:any;

    exit(){
      let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [{
          text: "exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
  }
  exitApp(){
    this.platform.exitApp();
  }
  ionViewDidLoad() {
        if(this.x == false){
      this.navCtrl.push(Login);
    }
    this.exit;
    setTimeout(()=>{
      this.splash= false;
    },2000);
  
    console.log('ionViewDidLoad Articles');
     this.profile = JSON.parse(localStorage.getItem('profile'));
    const data = {
      id: this.profile.identities[0].user_id,
      provider: this.profile.identities[0].provider,
      userid: this.profile.user_id,
      profilepic :this.profile.picture_large,
      name :this.profile.name
    };

 
if(data){



      this.authService.checkId(data).subscribe(res => {
        console.log("recieved");
        this.user = res.data;



        const follow = this.user.personal.followeusers;

        if (follow.length>0){

          const Userdata = {id:data.id};

          this.BlogService.getPosts(Userdata.id).subscribe(res=>{
             this.posts = res.data;
          
            console.log(this.posts)


          });
        }else{


        }

      });

    }

  }
 ionViewWillUnload() {
    console.log("Looks like I'm about to leave :(");
    
  }

    pushPage(){
      let item = this.posts;
      this.navCtrl.push(Post, {
        id: item[0]._id  ,
    
    });
  }
   refresh(refresher){
     this.ionViewDidLoad();
               setTimeout(() => {
       console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
    }
}

 