import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.models';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  
  /* le modal est une surpage de la page - un overlay */
  constructor(private modalCtrl: ModalController) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onLocate() {

  }

  onOpenMap() {
    /* redirection vers la carte et vers un point précis de la carte */
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location});
    modal.present();
  }

  onTakePhoto() {

  }
}
