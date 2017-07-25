import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers,Response } from "@angular/http";

/**
 * Generated class for the Post page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',

})
export class Post {
  postID: string;
  postdata:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
   this.postID =   navParams.get("id");
    console.log(this.postID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Post');
        let headers = new Headers();
    this.http.get("http://localhost:3000/blog/getPostdata/"+this.postID,{headers:headers}).subscribe((res:Response)=>{
      this.postdata = res.json().data[0];
      console.log(this.postdata)
    })
  }

}
