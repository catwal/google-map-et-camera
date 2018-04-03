import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location.models';


@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  marker: Location;
  /* pour gerer la gestion du modal confirme et abort j'ai besoin de view controller */
  constructor(private navParams: NavParams,
    private viewCtrl: ViewController) {
    /* la données va être récupérée de add-place */
    this.location = this.navParams.get('location');
    /* injection données du marker que si user a bien cliquer sur carte isSet défini dans add-place */
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    /* transmettra l'objet JS des coordonnées du marker */
    this.viewCtrl.dismiss({ location: this.marker });

  }

  onAbort() {
    /* this.viewCtrl <=> a la vue du modal */
    this.viewCtrl.dismiss();
  }
}
