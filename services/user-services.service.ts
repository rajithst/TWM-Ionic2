import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServicesService {

  constructor(private http: Http) { }


  ChangeOption(options:any){


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/option/FollowOption',options, {headers: headers}).map(res => res.json());

  }

}
