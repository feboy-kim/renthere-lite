import { Agreement } from "../models/agreement"
import Leasegg from "../models/leasegg"
import { therenv } from "../there-env"

export async function leaseDetail(egg?: Leasegg): Promise<Agreement | undefined> {
    if (egg) {
        const query = encodeURIComponent(JSON.stringify(egg))
        try {
            const resp = await fetch(therenv.apiBase + "/detail?egg=" + query)
            if (resp.ok) {
                const d = await resp.json()
                if ("firstext" in d && "articles" in d) {
                    return d as Agreement
                }
            } else {
                throw new Error(resp.statusText)
            }
        } catch (e) {
            throw new Error(e instanceof Error ? e.message : "获取协议失败")
        }
    } else {
        return undefined
    }
}