import EventEmitter from "eventemitter3";

export default class Person {
    constructor(name, height, mass) {
        this.name = name
        this.height = height
        this.mass = mass

        this.init()
    }

    init() {
        console.log(`Person ${this.name} Created!`)
    }
}