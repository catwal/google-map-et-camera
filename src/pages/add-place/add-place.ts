import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
  /*nouvelle classe pour quand localisation est faite par le user - ici par défaut false */
  locationIsSet = false;

  /* le modal est une surpage de la page - un overlay */
  constructor(private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private ToastCtrl: ToastController) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Recherche de votre localisation...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          /* anciennes données par défaut vont se transformer en celle de la geolocalisation */
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
          console.log(location);
        }
      )
      .catch(error => {
        loader.dismiss();
        const toast = this.ToastCtrl.create({
          message: 'Localisation impossible',
          duration: 2500
        });
        toast.present();
        console.log(error);
      }

      );
  }

  onOpenMap() {
    /* redirection vers la carte et vers un point précis de la carte */
    const modal = this.modalCtrl.create(SetLocationPage,
      /* permet ouverture pour marker ou carte avec marker du user définit par la classe isSet */
      { location: this.location, isSet: this.locationIsSet });
    modal.present();
    /* fermeture du modal sans ou avec données coords */
    modal.onDidDismiss(
      data => {
        if (data) {
          /* appel des anciens coordonnées pour avoir les nouveaux du marker */
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onTakePhoto() {

  }
}
