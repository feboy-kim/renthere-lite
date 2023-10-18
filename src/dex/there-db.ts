import Dexie from "dexie";
import Renthing from "../models/renthing";
import Flathing from "../models/flathing";

class RenthereDB extends Dexie {
    flathings!: Dexie.Table<Flathing, number>
    renthings!: Dexie.Table<Renthing, number>

    constructor() {
        super("renthere")
        this.version(1).stores({
            flathings: '++id, &address',
            renthings: '++id, flatId, startDate'
        })
        this.flathings.mapToClass(Flathing)
        this.renthings.mapToClass(Renthing)
    }
}

export const db = new RenthereDB()
