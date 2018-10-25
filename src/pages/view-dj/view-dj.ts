import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AddDjProvider } from '../../providers/add-dj/add-dj';
import { AddDjPage } from '../add-dj/add-dj';
import { ViewDetailsPage } from '../view-details/view-details';

@IonicPage()
@Component({
  selector: 'page-view-dj',
  templateUrl: 'view-dj.html',
})
export class ViewDjPage {
  checkUser:boolean;
  categoty:string='';
  DJGenre=[];
  filteredusers=[];
  dj=[];
  constructor(public navCtrl: NavController, private DjPROV: AddDjProvider,public navParams: NavParams) {
    this.categoty=this.navParams.get('data');
    this.checkUser=this.navParams.get('tool');
    console.log('tool',this.checkUser)
    this.DjPROV.getallusers().then((res: any) => {
      this.filteredusers = res;
      for(let key = 0;key < this.filteredusers.length;key++){
         if(this.filteredusers[key].genre===this.categoty){
          this.DJGenre.push(this.filteredusers[key]);
          console.log('shit..',this.DJGenre);
        }
      }
    })
  }
  addDJ(){
    this.navCtrl.push(AddDjPage,{
      data:this.checkUser
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDjPage');
  }
  gotoDetails(i:number){
    this.dj.push(this.DJGenre[i]);
    this.navCtrl.push(ViewDetailsPage,{data:this.dj});
    this.dj=[];
  }

  goback(){
    this.navCtrl.setRoot(HomePage);
  }

}
