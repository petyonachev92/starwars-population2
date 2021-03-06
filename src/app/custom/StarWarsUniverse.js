
import EventEmitter from "eventemitter3";
import delay from "../utils";
import Film from "./Film";
import Planet from "./Planet";


const EVENTS = {
    FILM_ADDED: 'film_added',
    UNIVERSE_POPULATED: 'universe_populated'
}

export default class StarWarsUniverse extends EventEmitter {
    constructor() {
        super();
        this.films = []
        this.planet = null;
    }

    static get events() {
        return EVENTS;
    }

    async init() {
        const response = await fetch('https://swapi.booost.bg/api/planets/')
        const data = await response.json();

        let dataForPlanet = null;

        for (let i = 1; i <= +data.count; i++) {
            const resp = await fetch(`https://swapi.booost.bg/api/planets/${i}/`);
            const respData = await resp.json();

            if (+respData.population == 0) {
                dataForPlanet = respData;
            }
            
        }
        const peopleResp = await fetch('https://swapi.booost.bg/api/people/')
        const peopleData = await peopleResp.json();
        
        const planet = new Planet(dataForPlanet.name, 1, peopleData.results);

        console.log(peopleData.results)
        
        this.planet = planet;

        this.planet.on(Planet.events.PERSON_BORN, (obj) => this._onPersonBorn(obj.filmUrls) )
        this.planet.on(Planet.events.POPULATING_COMPLETED, () => { delay(2, () => this.emit(StarWarsUniverse.events.UNIVERSE_POPULATED)) }) 
        this.on(StarWarsUniverse.events.UNIVERSE_POPULATED, () => console.log(this.planet.populationCount))
        this.on(StarWarsUniverse.events.UNIVERSE_POPULATED, () => console.log(this.films.length))
        planet.populate();

    }

    _onPersonBorn(arr) {
        
        arr.forEach(url => {
            
            if (!this.filmExists(url)) {

                const film = new Film(url)
                this.films.push(film)
                this.emit(StarWarsUniverse.events.FILM_ADDED)
            }
        });
        
    }

    filmExists(url) {
        for (let i = 0; i < this.films.length; i++) {
            if (this.films[i].url == url) {
                return true;
            }
        }
        return false;
    }    
}
