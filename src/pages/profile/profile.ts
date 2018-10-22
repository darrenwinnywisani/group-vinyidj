import { SigninPage } from './../signin/signin';
import { HomePage } from './../home/home';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController } from 'ionic-angular';
import 'firebase/database';
import 'firebase/auth';
import { AddDjProvider } from '../../providers/add-dj/add-dj';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase, { User } from 'firebase/app';
import { ImageProvider } from '../../providers/image/image';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  currentUser:User;
  firebaseRef: firebase.database.Reference;
  temparr=[];
  filteredusers=[];
  imgPreview = 'assets/imgs/chatterplace.png';
  userProfile:any;
  avatar: string;
  stagename: string ='';
  email:string;
  location:string;
  constructor(public navCtrl: NavController, private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,private djPROV:AddDjProvider, private imagePicker: ImagePicker,
    private base64: Base64, public imageProvider: ImageProvider,private profilePROV:ProfileProvider,
    public camera: Camera, public alert: AlertController, public zone: NgZone,private authPROV:AuthProvider) {

      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          console.log(user)
        this.currentUser=user;
        this.firebaseRef = firebase.database().ref(`/DjProfile/${user.uid}`)
 
        }
      })
  }  
  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.djPROV.getuserdetails().then((res: any) => {
      this.stagename = res.stageName;
      this.email = res.email;
      this.location= res.Location;
      console.log('userProfile',res)
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }
  done(){
    this.navCtrl.setRoot(HomePage);
  }
  updateName(){

  }
  updateEmail(){

    const alert:Alert=this.alertCtrl.create({
  
      inputs:[{
        name:'oldEmail',
        placeholder:'enter old email',
     type:'email'
      },{
        name:'newEmail',
        placeholder:'enter new email',
        type:'email'
    
      }],
      buttons:[{
        text:'cancel',
      },{
        text:'save',
        handler:data =>{
          this.profilePROV.updateEmail(data.newEmail,data.oldEmail)
          .catch(error=>{
            console.log('error message from catch',error.message)
           let newAlert:Alert=this.alertCtrl.create({
             message:error.message
           })
           newAlert.present(); 
          })
        }
      }],
     
    })
    alert.present()
    }
    takePhoto() {
      this.camera.getPicture({
        quality: 95,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetHeight: 800,
        targetWidth: 500,
        allowEdit: true,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }).then((profilePicture) => {
        firebase.storage().ref(`/profilePictures/${this.currentUser.uid}`).putString(profilePicture, 'base64', { contentType: 'image/png' })
        .then((savedProfilePicture) => {
        
          savedProfilePicture.ref.getDownloadURL().then((downloadedUrl)=>{
          this.imgPreview = downloadedUrl;
            this.firebaseRef.child('/profile').set(downloadedUrl)
         
          })
      
          })
       
      }, err => {
        console.log('érror' + JSON.stringify(err))
      })
     }
     getPhoto() {
      let options = {
        maximumImagesCount: 1
      };
      this.imagePicker.getPictures(options).then((results) => {
        const newAlert: Alert = this.alert.create({
          message: results,
          buttons: [{ text: 'ok', role: 'cancel' }]
        })
        newAlert.present()
        const pic = firebase.storage().ref('profilePictures/picture.png')
        pic.putString(results[0], 'base64', { contentType: 'image/png' })
        for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.saveImage(this.imgPreview);
        }
      }, (err) => { });
      }
      saveImage(results) {
        this.imageProvider.saveImage(results)
      }

      signoutConfirm(){
        let alert = this.alertCtrl.create({
          subTitle:'Are you sure you want to signout?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              
              }
            },
            {
              text: 'Yes',
              handler: () => {
                this.authPROV.signOut().then(() => {
                  this.authPROV.signOut();
                  this.navCtrl.setRoot(SigninPage);
                });
              }
            }
          ]
        });
        alert.present();
      } 

}
