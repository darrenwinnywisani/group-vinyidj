<<<<<<< HEAD
import { SplashPage } from './../pages/splash/splash';
=======

>>>>>>> 61b2898104177cb6d1f6fbb51c3da7b3483e42f4
import { AddDjPage } from './../pages/add-dj/add-dj';
import { SigninPage } from './../pages/signin/signin';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import * as firebase from 'firebase';
import { ProfilePage } from '../pages/profile/profile';
<<<<<<< HEAD
=======
import { SplashPage } from '../pages/splash/splash';
>>>>>>> 61b2898104177cb6d1f6fbb51c3da7b3483e42f4
import { ViewDetailsPage } from '../pages/view-details/view-details';
import { BookingPage } from '../pages/booking/booking';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

<<<<<<< HEAD
  rootPage: any=SplashPage;
=======
  rootPage: any= HomePage;
>>>>>>> 61b2898104177cb6d1f6fbb51c3da7b3483e42f4

  constructor(public platform: Platform, private loadingCtrl:LoadingController,public statusBar: StatusBar, public splashScreen: SplashScreen,public alertCtrl :AlertController,private authPROV:AuthProvider) {
    // this.handleSplashScreen()
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
   
  }
}