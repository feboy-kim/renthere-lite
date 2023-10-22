import Flatuple from "../models/flatuple";
import Leasegg from "../models/leasegg";
import Rentuple from "../models/rentuple";
import { db } from "./there-db";

export const getLeasegg = async (rentId: number) => {
    const rent = await getRenthing(rentId)
    if (rent) return new Leasegg(rent, await db.flathings.get(rent.flatId))
    else return undefined
}

// flathing related
export const getFlathing = async (id: string | number) => {
    if (typeof id === "string") {
        const n = Number.parseInt(id)
        return Number.isNaN(n) ? undefined : await db.flathings.get(n)
    } else return await db.flathings.get(id)
}
export const getFlatuple = async (id: string | number) => {
    if (typeof id === "string") {
        const n = Number.parseInt(id)
        if (!Number.isNaN(n)) {
            const d = await db.flathings.get(n)
            if (d && d.id) return new Flatuple(d.id, d.address)
        }
    } else {
        const d = await db.flathings.get(id)
        if (d && d.id) return new Flatuple(d.id, d.address)
    }
    return undefined
}
export const getFlatuples = async (): Promise<Flatuple[]> =>
    (await db.flathings.toArray()).map(it => new Flatuple(it.id ?? 0, it.address))

export const flathingCount = async(): Promise<number> => db.flathings.count()

// renthing related
export const getRenthing = async (id: string | number) => {
    if (typeof id === "string") {
        const n = Number.parseInt(id)
        return Number.isNaN(n) ? undefined : await db.renthings.get(n)
    } else return await db.renthings.get(id)
}
export const getRentuple = async (id: string | number) => {
    if (typeof id === "string") {
        const n = Number.parseInt(id)
        if (!Number.isNaN(n)) {
            const d = await db.renthings.get(n)
            if (d && d.id) return new Rentuple(d.id, d.lessor.realName, d.lessee.realName, d.startDate)
        }
    } else {
        const d = await db.renthings.get(id)
        if (d && d.id) return new Rentuple(d.id, d.lessor.realName, d.lessee.realName, d.startDate)
    }
    return undefined
}
export const getRentuples = async (): Promise<Rentuple[]> =>
    (await db.renthings.toArray()).map(it => new Rentuple(it.id ?? 0, it.lessor.realName, it.lessee.realName, it.startDate))

export const renthingCount = async(): Promise<number> => db.renthings.count()

