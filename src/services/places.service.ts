import { Place } from "../models/place.models";
import { Location } from "../models/location.models";

export class PlacesService {
    /* initialisation avec un tableau vide */
    private places: Place[] = [];

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
    }

    loadPlaces() {
        /* retourne juste une copie */
        return this.places.slice();
    }
    
    deletePlace(index: number) {
        this.places.splice(index, 1);
    }



}