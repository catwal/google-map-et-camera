import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place.models';
import { PlacesService } from '../../services/places.service';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  /* déclaration méthode et importation page */
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(private placesService: PlacesService,
    private modalCtrl: ModalController) {

  }


  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    /* quand chargera la page place ce sera le modal sur la page place avec les 
    données JS */
    const modal = this.modalCtrl.create(PlacePage, { place: place, index: index });
    modal.present();
  }
  /* au lancement de l'application j'aurais 
  l'affichage des places déjà enregistrées */
  ngOnInit() {
    this.placesService.fetchPlaces();
  }

}
