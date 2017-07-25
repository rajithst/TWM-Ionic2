import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BlogServiceService {

  constructor(
    private http:Http

  ) { }



  addBlogpost(data:any){

    console.log(data);
    let body=JSON.stringify(data);
    let header=new Headers({'Content-Type':'application/json'});
    let res=new RequestOptions({headers:header});
    return this.http.post('http://localhost:3000/blog/submitpost',body,res).map(res=>res.json());
  }




  getPosts(id:any){

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get('http://localhost:3000/blog/getPosts/'+id).map(res => res.json());

  }


}



