import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList  ,AngularFireAction} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/**
 * Generated class for the AllchatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allchat',
  templateUrl: 'allchat.html',
})
export class AllchatPage {

  email:any = '';
title:string = '';
body : string = '';


 
 
itemsRef: AngularFireList<any>;
items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>; //added
size$: BehaviorSubject<string|null>;//added


  constructor(public db:AngularFireDatabase ,public navCtrl: NavController, public navParams: NavParams) {

    this.itemsRef = db.list('/chat')
   
    this.size$ = new BehaviorSubject(null); 
    this.items$ = this.size$.switchMap(size =>  
      db.list('/chat', ref =>  
        size ? ref.orderByChild('date').equalTo(size) : ref  
      ).snapshotChanges() 
    );
  
    this.items$.subscribe(actions => {
     actions.forEach(action => {
       console.log(action.type);
       console.log(action.key);
       console.log(action.payload.val());
     })  ; 
    
  
 });
 



 

  }

  

  ionViewDidLoad() {
    
  }


  deleteMessage(id){
    this.itemsRef.remove(id);
 }



 
}
