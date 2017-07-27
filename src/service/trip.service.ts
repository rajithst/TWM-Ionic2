import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class TripService {

    constructor( private http: Http) { }

    getTrips(){
        return this.http.get("http://localhost:3000/trip")
        .map(res=>res.json());
    }

    addTrip(info){
        return this.http.post("http://localhost:3000/trip/addtrips",info)
        .map(res =>res.json());
    }
}
