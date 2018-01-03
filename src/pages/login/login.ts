import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController ,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';


import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

email:string = '';
password:string = '';
loggedin:boolean = false ;

loader = this.loadingCtrl.create({
  content: "Please wait...",
  duration: 3000
});

  constructor(public loadingCtrl: LoadingController ,private storage: Storage,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public fire:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
}


 

  
 



userLogin() {
  this.loader.present();
  this.fire.auth.signInWithEmailAndPassword(this.email, this.password)
  .then( data => {
    console.log('got some data', this.fire.auth.currentUser);
    this.storage.set('email', this.email);
    this.storage.set('password', this.password);
    this.storage.set('loggedin', true)
    this.alert('Success! You\'re logged in');
    this.loader.dismiss();
    this.navCtrl.setRoot( TabsPage );
    // user is logged in
  })
  .catch( error => {
    console.log('got an error', error);
    this.alert(error.message);
  })
  console.log('Would sign in with ', this.email, this.password);
}


registerUser(){
  this.navCtrl.push( RegisterPage );
}







}
