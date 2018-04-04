import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.models';
import { Camera } from '@ionic-native/camera';
import { PlacesService } from '../../services/places.service';
import { File, Entry, FileError } from '@ionic-native/file';
import { Cordova } from '@ionic-native/core';

declare var cordova: any;

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

  /* ajout de la propriété pour conservé les photos */
  imageUrl = '';


  /* le modal est une surpage de la page - un overlay */
  constructor(private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private ToastCtrl: ToastController,
    private camera: Camera,
    private placesService: PlacesService,
    private file: File) { }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.descrption, this.location, this.imageUrl)
    /* reset de l'ensemble des données */
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
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
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          /* definition du nom de l'image enregistré - expressions régulières - c'est pour pouvoir dire ou et avec quel nom
          le fichier doit être enregistré*/
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          /* ancienne methode cordova - a voir si ça fonctionne */
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
          .then(
            (data: Entry) => {
              /* la propriété nativeURL enregistre l'image */
              this.imageUrl = data.nativeURL;
              this.camera.cleanup();
/*   c'est une alternative
            this.file.removeFile(path, currentName);
 */            }
          )
          .catch(
            (err: FileError) =>{
              this.imageUrl='';
              const toast = this.ToastCtrl.create({
                message: 'Impossible d\'enregistrer l\'image',
                duration: 2500
              });
              toast.present();
              /* effacera l'image */
              this.camera.cleanup();
            }
          );
          this.imageUrl = imageData;
          console.log(imageData);
        }
      )
      .catch(
        error => {
          const toast = this.ToastCtrl.create({
            message: 'Impossible de prendre l\'image',
            duration: 2500
          });
          toast.present();
          console.log(error);
        }
      );

  }
}
