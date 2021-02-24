import EventEmitter from "eventemitter3";
import delay from "../utils";
import Person from "./Person";

const EVENTS = {
    PERSON_BORN: 'person_born',
    POPULATING_COMPLETED: 'populating_completed'
}

let i = 0;

export class Planet extends EventEmitter {
    constructor(name, popDel = 1, peopleData) {
        super()
        this.name = name
        this.config = {
            populationDelay: popDel
        }
        this.peopleData = peopleData
        this.population = []
    }

    static get events() {
        return EVENTS;
    }

    get populationCount() {
        return this.population.length;
    }

    async populate() {
        let element = this.peopleData[i]

        if (i < 10) {
            
            await delay(this.config.populationDelay)

            const person = new Person(element.name, element.height, element.mass);

            this.population.push(person)

            this.emit(Planet.events.PERSON_BORN, {filmUrls: element.films});

            i++;
            await this.populate();
        } else {
            this.emit(Planet.events.POPULATING_COMPLETED);
        }

    }
}