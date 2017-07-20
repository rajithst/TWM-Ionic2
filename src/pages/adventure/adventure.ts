// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, Events, AlertController, ModalController, Platform } from 'ionic-angular';
import { AdvModal } from "../adv-modal/adv-modal";
import { GoogleMap, GoogleMapsEvent } from 'ionic-native';
import { Chart } from 'chart.js';


import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
 var currentposition:any;
 var weather :any;
Geolocation.getCurrentPosition().then(res => {
   res.coords.latitude
   res.coords.longitude
   console.log(res);
   currentposition = res;

}).catch((error) => {
  console.log('Error getting location', error);
});

declare var google:any;

@Component({
  selector: 'page-adventure',
  templateUrl: 'adventure.html',
})
export class Adventure implements OnInit {
   @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
   @ViewChild('doughnutCanvas') doughnutCanvas; 

    doughnutChart:any;
    lineChart:any;
    
 
    address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    map: any;
    markers = [];
    placedetails: any;

    constructor(public navCtrl: NavController,
        public modalCtrl: ModalController) { 
    }
    
    ngOnDestroy(){
        this.refereshmap();
    }

    ngOnInit() {
     

        this.initMap();
        this.initPlacedetails();
        this.showModal();
        this.refereshmap();

         this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'horizontalBar',
            options : {
                scaleShowLabels : false,
               barShowLabels: true,

    scales : {
        xAxes : [ {
            gridLines : {
                display : false
            }
        } ],
                        yAxes: [{
                    gridLines: {
                       display : false
                    }
                }]
    }
},
            data: {
                labels: ["1", "2", "3", "4", "5"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        '#EF5350',
                        '#EF5350',
                        '#EF5350',
                        '#EF5350',
                        '#EF5350',
                        '#EF5350'
                    ],
                    hoverBackgroundColor: [
                        "#D32F2F",
                        "#D32F2F",
                        "#D32F2F",
                        "#D32F2F",
                        "#D32F2F",
                        "#D32F2F"
                    ]
                }]
            }
 
        });
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            options : {
                scaleShowLabels : false,
               barShowLabels: true,

    scales : {
        xAxes : [ {
            gridLines : {
                display : false
            }
        } ],
                        yAxes: [{
                    gridLines: {
                       display : false
                    }
                }]
    }
},
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            }
 
        });
     
    }

refereshmap(){
    google.maps.event.trigger(this.map, 'resize');
    
}

    showModal() {
        // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(AdvModal);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
                this.address.place = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }


    private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
         
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                self.placedetails.photo_reference = place.photos[0].getUrl({'maxWidth': 480, 'maxHeight': 246});
               
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }                                     
                }                  
                // set place in map
                self.map.setCenter(place.geometry.location);
                self.createMapMarker(place);
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }

    private initMap() {
    
        var point = {lat: -34.603684, lng: -58.381559}; 
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            disableDefaultUI: true,
            draggable: true,
            zoomControl: true
        });
        
    }

    private createMapMarker(place:any):void {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: this.map,
          
          position: placeLoc
        });    
        this.markers.push(marker);
    }

    private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short:'', long:'' },                           // calle 
                street_number: { set: false, short:'', long:'' },                   // numero
                sublocality_level_1: { set: false, short:'', long:'' },             // barrio
                locality: { set: false, short:'', long:'' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
                country: { set: false, short:'', long:'' },                         // pais
                postal_code: { set: false, short:'', long:'' },                     // codigo postal
                postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
            }    
        };        
    }    
}

