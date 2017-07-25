import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

interface shareObjects{

  apikey:string;

}


@Injectable()
export class GooglemapsService {





  constructor(

    private http:Http) {


  }

  getLocations(place){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Headers','*');
    headers.append('Access-Control-Allow-Origin','*');

    return this.http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+place+'&key=AIzaSyCskb-CN9GH0d5KmjmEL8gZ52SvTYuN7mI').map(response => response.json());

  }


}
