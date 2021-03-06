import { Location } from "./location.models";

export class Place {
    constructor(public title: string,
        public description: string,
        public location: Location,
        public imageUrl: string) { }
}