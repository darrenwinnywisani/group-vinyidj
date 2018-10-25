import { SigninPage } from './../signin/signin';
import { FacebookProvider } from './../../providers/facebook/facebook';
import { BookingPage } from './../booking/booking';
import { HomePage } from './../home/home';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ViewDjPage } from '../view-dj/view-dj';
import firebase, { User } from 'firebase/app';
import 'firebase/database';
/**
 * Generated class for the ViewDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-details',
  templateUrl: 'view-details.html',
})
export class ViewDetailsPage {


  temparr=[];
  filteredusers=[];
  currentUser:User;

  facebook:string='https://www.facebook.com/';
  constructor(public navCtrl: NavController,public alertCTR: AlertController, private facebookProv:FacebookProvider,public navParams: NavParams, private DjPROV:AddDjProvider) {
    
    this.filteredusers=this.navParams.get('data');
    this.facebook=this.filteredusers[0].facebookLink;

    console.log('facebook',this.facebook)

  }

  ionViewDidEnter() {
    this.filteredusers=[];
    this.filteredusers=this.navParams.get('data');
    console.log('ionViewDidLoad ViewDetailsPage');
  }

  book(){
    
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
      this.currentUser=user;
      this.navCtrl.push(BookingPage,{
        data:this.filteredusers
      })
      console.log('email',this.filteredusers)
      }else{
        const alert = this.alertCTR.create({
          subTitle: 'Please sign in first to make a booking',
          buttons: [{
            text:'Cancel',
            role:'cancel'},{
            text:'Ok',
            handler:data=>{
                 this.navCtrl.push(SigninPage);
              }
            }]
        });
        alert.present();
      }
  })
   
  }
  facebooklink(){
      window.open(this.facebook,"_system","location=yes");
      this.facebookProv.facebookLink(this.facebook).subscribe(results=>{
        console.log('facebook',results)
      });
      
    }
}
