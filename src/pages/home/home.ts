import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
//import { Storage } from '@ionic/storage';
//import { RestApiProvider } from '../../providers/rest-api/rest-api';


// declare var google;


// compilar ionic cordova build android --aot

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

    lat:any;
    long:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              // private storage: Storage
  ) {
    this.getLocalizacao();
  }


  loading(){
    let loader = this.loadingCtrl.create({
      spinner:"crescent",
      content:"processando...",
      duration:250
    });
    loader.present();
  }

  getLocalizacao() {
    this.geolocation.getCurrentPosition()
        .then((resp) => {
            this.lat  = resp.coords.latitude;
            this.long = resp.coords.longitude;
          //console.log(resp.coords.latitude, resp.coords.longitude);
            window.localStorage.setItem('latitude', this.lat);
            window.localStorage.setItem('longitude', this.long);

        }).catch((error) => {
          console.log('Erro ao recuperar sua posição', error);
        });
  }

  disp(){ this.loading(); this.navCtrl.push('DispPage'); }


}
