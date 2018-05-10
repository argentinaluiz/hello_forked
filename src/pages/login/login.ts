import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { LoginProvider } from '../../providers/login/login';
//import { HttpClientModule } from '@angular/common/http';

// Clit model
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data:any;
  form: FormGroup;
  email:any;
  password:any;
  retorno:any;
  //private apiUrl = 'https://www.magisclick.com.br/api/';

  user = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public  navParams: NavParams,
              public  toastCtrl: ToastController,
              public  loadingCtrl: LoadingController,
              public  logando:LoginProvider,
              //public  http: Http,
              //public  httpClient: HttpClientModule,
  ) {
    // Chamada Construtor.
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      campo:    [null, [Validators.required]],
      email:    [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top',
        });
        toast.present();
    }

  login(){
    this.user = {
      email: this.email,
      password: this.password
    }
      let loading = this.loadingCtrl.create({
          content: 'Carregando...'
      });
      loading.present();

      this.logando.getToken(this.user)
          .subscribe( data => {
              this.retorno = data['token']['token'];
              console.log(data['token']['token']);
              window.localStorage.setItem('token',this.retorno);
              this.navCtrl.setRoot('HomePage');
              loading.dismiss();
              this.presentToast('Bem vindo ao Sistema Guardians!');
          },
              error =>  {
              loading.dismiss();
                  console.log(error);
              this.presentToast('Verifique sua conexão e tente novamente.');
              //console.log(error);
          }
      )

      /*
      this.http.post<any>('https://www.magisclick.com.br/api/guardian_login',this.user)
          .subscribe( data => {

              this.retorno = data;

              //console.log(JSON.stringify(this.retorno));
              console.log(this.retorno);

              //window.localStorage.setItem('token',data.token);
          }) // */

      /*
      this.logando.token(this.user)
          .subscribe(
              res => {
                  console.log(res);

          },
              error =>  {
                  console.log(error);
          }); // */

    /*
    this.http.post<any>(this.apiUrl+'guardian_login', this.user)
        .subscribe( data => {
          console.log(data);
          //window.localStorage.setItem('token',data.token);
        }) // */

  }


}
