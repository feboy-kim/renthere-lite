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

export function deleteFlathing(id: string | number): Promise<void> {
    if (typeof id === "string") {
        return db.flathings.delete(Number.parseInt(id))
    } else {
        return db.flathings.delete(id)
    }
}

export function deleteRenthing(id: string | number): Promise<void> {
    if (typeof id === "string") {
        return db.renthings.delete(Number.parseInt(id))
    } else {
        return db.renthings.delete(id)
    }
}
