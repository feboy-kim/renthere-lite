import Flathing from "../models/flathing"
import Renthing from "../models/renthing"
import { db } from "./there-db"

export async function addFlathing(flat: Flathing): Promise<number> {
    return await db.flathings.add(flat)
}

export async function addRenthing(rent: Renthing): Promise<number> {
    return await db.renthings.add(rent)
}

export async function putFlathing(flat: Flathing): Promise<number> {
    return await db.flathings.put(flat)
}

export async function putRenthing(rent: Renthing): Promise<number> {
    return await db.renthings.put(rent)
}

export function deleteFlathing(flat: string | number): Promise<number | void> {
    if (typeof flat === "string") {
        return db.flathings.where({address: flat}).delete()
    } else {
        return db.flathings.delete(flat)
    }
}

export function deleteRenthing(rent: { flatId: number, startDate: Date } | number): Promise<number | void> {
    if (typeof rent === "number") {
        return db.renthings.delete(rent)
    } else {
        return db.renthings.where({flatId: rent.flatId, startDate: rent.startDate}).delete()
    }
}
