import { Component } from '@angular/core';
import { NavController  ,LoadingController , AlertController, Platform} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase ,AngularFireList  } from 'angularfire2/database';
 
import { AllchatPage } from '../allchat/allchat';
import { LocalNotifications } from '@ionic-native/local-notifications';
 import { Observable } from 'rxjs/Observable';

 import firebase from 'firebase';

 import { Badge } from '@ionic-native/badge';

 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  titlefirebase = '';
  bodyfirebase = '';


loggedin : boolean = false;

email:any = '';
title:string = '';
body : string = '';

infor  = {
  body :  '' ,
  date : '',
  email: '',
  title:  '',
 
 }


 

 badgeNumber  ;

 mystring  ;
 isValid= false  ;


 itemsRef: AngularFireList<any>;

items: Observable<any[]>;

notifi: Observable<any[]>;

loader = this.loadingCtrl.create({
  content: "Please wait...",
  duration: 3000
});




  constructor(private badge: Badge, public alertCtrl: AlertController ,public db:AngularFireDatabase , public loadingCtrl: LoadingController ,public afAuth: AngularFireAuth ,private storage: Storage,public navCtrl: NavController, private localNoti: LocalNotifications, private platform: Platform ) {

    this.storage.get('email' ).then( (val)=> {
      this.email = val;
    });
  
    this.storage.get('loggedin' ).then( (val)=> {
      this.loggedin = val;
    });
 



    var notifiRef = firebase.database().ref("notifications/");

    notifiRef.on("child_added", function(data ) {
       var newNotifi  = data.val();
       console.log("title: " + newNotifi.title);
       console.log("date: " + newNotifi.date);
       console.log("email: " + newNotifi.email);  
    });
    
    this.mystring = notifiRef.toString  
 

if(this.mystring !=""){
this.isValid = true;
console.log("this.isValid: " + this.isValid);
}

 

// for alert notification
    this.notifi = db.list('notifications', 
    ref => ref.orderByChild('date').limitToLast(1)).valueChanges();
    this.notifi.subscribe(actions => {
      actions.forEach(action => {
        this.infor = action;
        this.infor.title = action.payload.val().title;
        this.infor.date = action.payload.val().date;
        this.infor.email = action.payload.val().email;
      });  
    });




 







    this.platform.ready().then(() => {
      this.localNoti.on("click", (noti, state) => {
        alert(state);
        alert( this.infor.title + this.infor.email,);
      });
    });
 





    if(this.infor.title !="" && this.infor.email !="" ){

      this.platform.ready().then(() => {
        this.localNoti.schedule({
          id: 1,
          title: this.infor.title ,
          text:  this.infor.email ,
          at: new Date(new Date().getTime() + 10000),
          data: {"id": 1, "name": "Mr.A"}
        });
      });
}




this.itemsRef = db.list('notifications', ref => ref.orderByChild('decs'))
    this.itemsRef.snapshotChanges().subscribe(su=>{
    //  this.sendPush();
     

    })

 
 
 
this.requestPermission()

  }




  sendPush(){
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        id: 1,
        title: this.infor.title,
        text: this.infor.email,
        at: new Date(new Date().getTime() + 10000),
      
      });
    });
    
  }














 
  async requestPermission() {
    try {
      let hasPermission = await this.badge.hasPermission();
      console.log(hasPermission);
      if (!hasPermission) {
        let permission = await this.badge.registerPermission();
        console.log(permission);
      }
    } catch (e) {
      console.error(e);
    }
  }








  async setBadges(badgeNumber: number) {
    try {
      let badges = await this.badge.set(badgeNumber);
      console.log(badges);
    } catch (e) {
      console.error(e);
    }
  }

 

  async clearBadges(){
    try {
      let badge = await this.badge.clear();
      this.isValid = false;
      console.log(this.isValid);
    }
    catch(e){
      console.error(e);
    }
  }












  alertFirebaseNotifi(){
    let alert2 = this.alertCtrl.create({
      title: this.infor.title,
      subTitle: this.infor.email,
      buttons: ['OK']
    });
    alert2.present();

  }

 


  ionViewDidLoad(){
   

  }

 








  logout(){
    this.loader.present();
    this.afAuth.auth.signOut();
    this.storage.set('email', '');
    this.storage.set('password', '');
    this.storage.set('loggedin', false);
    this.loader.dismiss();
    this.navCtrl.push(AllchatPage);
    //console.log("Muhammed Essa")
  }




 


  sendMessage(){
    if(   this.title !="" && this.body !="" ){


      // for notification
      const itemsRef = this.db.list('notifications');
      itemsRef.remove();

      this.db.list('/notifications').push({
        email:this.email,
        title:this.title,
        date: Date.now() 
      });

      //for chat database
      this.db.list('/chat').push({
        email:this.email,
        title:this.title,
        body : this.body,
        date: Date.now() 
      });
      this.email="" ;
      this.title=""  ;
      this.body=""   ;

      this.navCtrl.push( AllchatPage );
      
    }else{
      let alert = this.alertCtrl.create({
        title: 'Info',
        subTitle: 'You have empty fields!',
        buttons: ['OK']
      });
      alert.present();
    }

    
  }

 





  btnPushClicked() {
  
    this.platform.ready().then(() => {
      this.localNoti.schedule({
        id: 1,
        title: this.infor.title,
        text: this.infor.email,
        at: new Date(new Date().getTime() + 10000),
        data: {"id": 1, "name": "Mr.A"}
      });
    });


 
    
    this.alertFirebaseNotifi() ;
     


  }

 

 








}





















 
  //   this.items = db.list('chat', 
  //   ref => ref.orderByChild('date').limitToLast(1)).valueChanges();

  //   this.items.subscribe(actions => {
  //     actions.forEach(action => {
  //       // console.log(action.title);
  //       // console.log(action.body);
  //       // console.log(action.email);
  //       // console.log(action.payload.val());
  //       this.infor = action;
  //       console.log( "values" +this.infor );
      
  //       // this.infor.title = action.payload.val().title;
  //       // this.infor.body = action.payload.val().body;
  //       // this.infor.email = action.payload.val().email;

  //     });
  //   });
  
   

  // //  new Date(new Date().getTime() + 10000)

  //   this.items2 = db.list('chat', 
  //   ref => ref.orderByChild('date').limitToLast(1).equalTo(Date.now()) ).valueChanges();

  //   // this.items2 = db.list('chat', 
  //   // ref => ref.orderByChild('date').limitToLast(1) ).valueChanges(); 
 

 
    
//  var notif = firebase.database().ref("/chat").orderByChild('date').limitToLast(1) ;

//  notif.on("child_added", function(data, prevChildKey) {
//    var newnotif = data.val();
//    console.log("title: " + newnotif.title);
//    console.log("body: " + newnotif.body);
//    console.log("email: " + newnotif.email);
//   //  console.log("date: " + newnotif.date);
//   //  console.log("key: " + prevChildKey);
// });