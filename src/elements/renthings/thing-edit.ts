import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import "./thing-form"
import Renthing from "../../models/renthing"
import { Task } from "@lit/task"
import { getRenthing } from "../../dex/db-reader"
import { addRenthing, putRenthing } from "../../dex/db-writer"
import { router } from "../../app-helper"
import { therenv } from "../../there-env"

@customElement('renthing-edit')
export default class RenthingEdit extends LitElement {
    @property({ type: Number }) thingId?: number
    private _thing!: Renthing

    constructor() {
        super()
        document.title = "编辑租约 - " + therenv.appName
    }

    private _rentask = new Task(this, {
        task: async ([id]) => {
            return id ? await getRenthing(id) ?? new Renthing() : new Renthing()
        }, args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._rentask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing) => {
                this._thing = thing
                return html`
                    <div @submitted=${this._submitListener}>
                        <renthing-form .thing=${thing}></renthing-form>
                    </div>
                `
            },
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    private _submitListener(e: CustomEvent) {
        if (e.detail.d instanceof Renthing) {
            const datum = e.detail.d as Renthing
            if (datum.isValid) {
                if (datum.id) {
                    if (this._thing?.equals(datum)) {
                        router.navigate(`/rents/view/${datum.id}`, { historyAPIMethod: 'replaceState' })
                    } else {
                        putRenthing(datum).then(() => {
                            router.navigate(`/rents/view/${datum.id}`, { historyAPIMethod: 'replaceState' })
                        }).catch(e => console.error(e))
                    }
                } else {
                    addRenthing(datum).then(d => {
                        router.navigate(`/rents/view/${d}`, { historyAPIMethod: 'replaceState' })
                    }).catch(e => console.error(e))
                }
            }
        } else {
            if (this.thingId) router.navigate(`/rents/view/${this.thingId}`, { historyAPIMethod: 'replaceState' })
            else router.navigate(`/rents/view`, { historyAPIMethod: 'replaceState' })
        }
    }

    static styles = [
        css`
        `
    ]

}