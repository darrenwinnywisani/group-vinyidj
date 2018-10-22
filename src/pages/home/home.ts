import { UserprofilePage } from './../userprofile/userprofile';
import { ProfilePage } from './../profile/profile';
import { CatalogProvider } from './../../providers/catalog/catalog';
import { ViewDetailsPage } from './../view-details/view-details';
import { AddDjPage } from './../add-dj/add-dj';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ViewDjPage } from '../view-dj/view-dj';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  Name: string;
  DjProfile: any;
  stageNameList: Array<any>;
  isSearchbarOpened=false;
  filteredusers=[];
  temparr=[];
  viewDetails=[];
  category=[];
  arrGenre=[];
  genres:string='';
<<<<<<< HEAD
  userProfile:any;
  avatar:string;
=======
>>>>>>> 61b2898104177cb6d1f6fbb51c3da7b3483e42f4
  tempGenre:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DjPROV: AddDjProvider,public zone: NgZone, public alertCtrl: AlertController, private catProv: CatalogProvider) {
      this.DjPROV.getallusers().then((res: any) => {
        this.filteredusers = res;
<<<<<<< HEAD
        this.temparr = res;
      })
      this.userProfile=this.DjPROV.getuserdetails();
      console.log('user',this.userProfile)
=======
      })

>>>>>>> 61b2898104177cb6d1f6fbb51c3da7b3483e42f4
  }
  profile(){
    this.navCtrl.push(UserprofilePage)
  }
  viewDJ(i:number){
    this.viewDetails=[];
    this.viewDetails.push(this.filteredusers[i]);
    this.navCtrl.push(ViewDetailsPage,{
      data:this.viewDetails
    });
  }s
  searchDJ(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
 
    this.filteredusers = this.filteredusers.filter((v) => {
      if ((v.stageName.toLowerCase().indexOf(q.toLowerCase()) > -1)||(v.Location.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
        return true;
      }
      return false;
    })
  }

  sortedByGenre(i:number){
    this.category=[];
    this.category = ['Electronic music','House','Hip Pop','Gqom','Kwaito','RnB','Deep House','Commercial House','jazz','Soul','Accapella','Rock','Disco','Reggae','Gospel'];
    this.genres=this.category[i];
 
    this.navCtrl.push(ViewDjPage,{data:this.genres});
  }
} 