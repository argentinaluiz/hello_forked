import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

//import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { MyHttpInterceptorProvider } from '../providers/my-http-interceptor/my-http-interceptor';

import { DispRestProvider } from '../providers/disp-rest/disp-rest';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    FilePath,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorProvider,
      multi: true
    },
    DispRestProvider,
    LoginProvider,
  ]
})
export class AppModule {}
