import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import "./thing-form"
import Flathing from "../../models/flathing"
import { addFlathing, putFlathing } from "../../dex/db-writer"
import { router } from "../../app-helper"
import { Task } from "@lit/task"
import { getFlathing } from "../../dex/db-reader"
import { therenv } from "../../there-env"

@customElement('flathing-edit')
export default class FlathingEdit extends LitElement {
    @property({ type: Number }) thingId?: number
    private _thing!: Flathing

    constructor() {
        super()
        document.title = "编辑房屋 - " + therenv.appName
    }

    private _task = new Task(this, {
        task: async ([id]) => {
            return id ? await getFlathing(id) ?? new Flathing() : new Flathing()
        }, args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing) => {
                this._thing = thing
                return html`
                    <div @submitted=${this._submitListener}>
                        <flathing-form .thing=${thing}></flathing-form>
                    </div>
                `
            },
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    private _submitListener(e: CustomEvent) {
        if (e.detail.d instanceof Flathing) {
            const datum = e.detail.d as Flathing
            if (datum.isValid) {
                if (datum.id) {
                    if (!this._thing?.equals(datum)) {
                        putFlathing(datum).then(() => {
                            router.navigate(`/flats/view/${datum.id}`, { historyAPIMethod: 'replaceState' })
                        }).catch(e => console.error(e))
                    } else {
                        router.navigate(`/flats/view/${datum.id}`, { historyAPIMethod: 'replaceState' })
                    }
                } else {
                    addFlathing(datum).then(d => {
                        const searchold = router.getCurrentLocation().queryString
                        if (searchold && searchold.length > 5) {
                            router.navigate(`${searchold.substring(5)}`, { historyAPIMethod: 'replaceState' })
                        } else {
                            router.navigate(`/flats/view/${d}`, { historyAPIMethod: 'replaceState' })
                        }
                    }).catch(e => console.error(e))
                }
            }
        } else {
            if (this.thingId) router.navigate(`/flats/view/${this.thingId}`, { historyAPIMethod: 'replaceState' })
            else router.navigate(`/flats/view`, { historyAPIMethod: 'replaceState' })
        }
    }

}