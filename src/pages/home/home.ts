import { CatalogProvider } from './../../providers/catalog/catalog';
import { ViewDetailsPage } from './../view-details/view-details';
import { AddDjPage } from './../add-dj/add-dj';
import { AddDjProvider } from './../../providers/add-dj/add-dj';
import { Component } from '@angular/core';
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
  tempGenre:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DjPROV: AddDjProvider, public alertCtrl: AlertController, private catProv: CatalogProvider) {
      this.DjPROV.getallusers().then((res: any) => {
        this.filteredusers = res;
      })

  }

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