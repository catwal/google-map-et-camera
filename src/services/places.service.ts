import { Place } from "../models/place.models";
import { Location } from "../models/location.models";
/* import natif  du storage pour ionic
sinon: 
1- ionic cordova plugin add cordova-sqlite-storage
2- npm install --save @ionic/storage */
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { Injectable } from "@angular/core";


@Injectable()

export class PlacesService {
    /* initialisation avec un tableau vide */
    private places: Place[] = [];

constructor(private storage: Storage, private file: File){}

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
        /* set key & value = key et tableau des données */
         this.storage.set('places', this.places)
         /* on a un promise en faisant ça donc */
         .then(/* 
             data =>{

             } */
         )
         .catch(
             error =>{
                 this.places.splice(this.places.indexOf(place), 1);
             }
         );
    }

    loadPlaces() {
        /* retourne juste une copie */
        return this.places.slice();
    }

    fetchPlaces(){
        /* récupération de la key - en cas de succès je récupère le tableau
        de données*/
        this.storage.get('places')
        .then(
            (places: Place[])=>{
                /* ternaire */
                this.places = places != null ? places : [];
            }
        )
        .catch(
            err => console.log(err)
        );
    }

    deletePlace(index: number) {
        this.places.splice(index, 1);
        this.storage.set('places', this.places)
        .then(
            () =>{

            }
        )
        .catch(
            err => console.log(err)
        );
    }
    private removeFile(place: Place){
      /*   const currentName = ; */
    }
}