import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Location } from '../../models/location.models';


@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;

  constructor(private navParams: NavParams) {
    /* la données va être récupérée de add-place */
    this.location = this.navParams.get('location');
  }
}
