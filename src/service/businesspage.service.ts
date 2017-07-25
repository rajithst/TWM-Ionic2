import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BusinesspageService {
  user:any;

  constructor(
    private http:Http


  ) { }

  submitPagedata(user){

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/profile/createpage",user,{headers:headers}).map(res=>res.json());

  }




}
