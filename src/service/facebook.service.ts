import { Injectable } from '@angular/core';
import {  Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookService {

  constructor(
    private http:Http

  ) {}

  placesLiked(accessToken:any,userid:any){

    return this.http.get("https://graph.facebook.com/"+userid+"/photos?access_token="+accessToken).map(res=>res.json());

  }


}
