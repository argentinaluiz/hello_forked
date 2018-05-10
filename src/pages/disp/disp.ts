import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { DispRestProvider } from '../../providers/disp-rest/disp-rest';

@IonicPage()
@Component({
  selector: 'page-disp',
  templateUrl: 'disp.html',
})
export class DispPage {


  data: any;
  users: string[];
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;
  error:any;
  carregado:any;
  urlimg:any;
  totalPaginas:any;
  paginaAtu:any;

  constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public dispRest:DispRestProvider,
      public alertCtrl: AlertController,
  ) {
    this.getUsers();
  }


  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    let alert = this.alertCtrl.create({
      title: 'Verifique sua conexão <hr/>',
      subTitle: 'Por favor verifique sua conexão com a internet e tente novamente',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.push('HomePage')
        }
      }]
    });

    this.dispRest.getUsers(this.page)
        .subscribe(
            res => {
          this.urlimg    = 'https://www.magisclick.com.br';
          this.data = res;
          this.users = this.data.data;
          this.perPage = this.data.per_page;
          this.totalData = this.data.total;
          this.carregado = 'carregado';
          this.totalPage = this.data.total;
          setTimeout(() => {

            if(this.data == 'N'){
              loading.dismiss();
              alert.present();
            } else {
              loading.dismiss();
            }
          }, 100);

        },
            error =>  {
          this.errorMessage = <any>error;
          alert.present();
          loading.dismiss();
        });
  }

  doInfinite(infiniteScroll) {
    //this.loading();
    this.page = this.page+1;
    setTimeout(() => {
      this.dispRest.getUsers(this.page)
          .subscribe(
              res => {
            this.data = res;
            this.perPage = this.data.per_page;
            this.totalData = this.data.total;
            this.totalPage = this.data.total;
            this.totalPaginas = this.data.last_page;
            this.paginaAtu = this.data.current_page;
            for(let i=0; i<this.data.data.length; i++) {
              this.users.push(this.data.data[i]);
            }

          },
              error =>  this.errorMessage = <any>error);

      infiniteScroll.complete();
    });
  }

  detalheMarginal(user) {
    //this.loading();
    this.navCtrl.push('MarginaisDetalhesPage', {
      marginal: user
    });
  }




}
