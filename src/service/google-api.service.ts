import { Injectable } from '@angular/core';
import {  Http, Headers } from '@angular/http';

@Injectable()
export class GoogleAPIService {

  constructor( private http:Http) { }

  // getTopSights(city:any){

  //   let places:Array<string> = ["visiting places","tourist places","top sights","tourist attraction",city];
  //   var item = Math.floor(Math.random() * 4) + 1;
  //   var keyword = places[item];
  //   let headers = new Headers();
  //   headers.append('Access-Control-Allow-Headers','*');
  //   headers.append('Access-Control-Allow-Origin','*');
  //   return this.http.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query="+city+keyword+"+&key=AIzaSyD1wsxf68A21P1FVZyMBeop5X3io-2MH_E",{headers:headers}).map(res=>res.json());


  // }

 /* getPhotos(refKey:any){
    console.log(refKey);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Headers','*');
    headers.append('Access-Control-Allow-Origin','*');
    return this.http.get("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+refKey+"&key=AIzaSyD1wsxf68A21P1FVZyMBeop5X3io-2MH_E",{headers:headers}).map(res=>res.json());
  }*/



  getPlaces(key:any){

    let headers = new Headers();
    headers.append('Access-Control-Allow-Headers','*');
    headers.append('Access-Control-Allow-Origin','*');
    return this.http.get("http://localhost:3000/googleAPI/getplaces/"+key,{headers:headers}).map(res=>res.json());
  }

}
