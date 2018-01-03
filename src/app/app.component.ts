import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';


import { Storage } from '@ionic/storage';

import { AngularFireDatabase  } from 'angularfire2/database';
 

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
 rootPage;
 
 

  constructor( private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,public fire:AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

 


      this.rootPage = TabsPage;


    //   this.storage.get('loggedin').then((loggedin) => {
    //     if(  loggedin == true ) {
    //       this.rootPage = TabsPage;
    //     } else {
    //       this.rootPage = LoginPage;
    //     }
    // });

 
 
 



    });









  }


 





}
