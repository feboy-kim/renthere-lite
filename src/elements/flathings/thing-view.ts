import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlathing } from "../../dex/db-reader";
import Flathing from "../../models/flathing";
import { applianceDict, booleanumToString, facilityDict, sundryFeeDict } from "../../models/there-m";
import "../widgets/navigo-a"
import { smallSvg } from "../styles/svg-styles";

const subject = "租约之房"

@customElement('flathing-view')
export default class FlathingView extends LitElement {
    @property({ type: Number }) thingId!: number

    private _flatask = new Task(this, {
        task: async ([id]) => await getFlathing(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._flatask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Flathing) => thing ? html`<section>
                <h3>${thing.address}</h3>
                <p>${thing.descrip}</p>
                <p>
                    <span>${thing.myLayout}</span>
                    <span>${thing.myStorey}</span>
                    <span>${thing.myOrient}</span>
                </p>
                <p>${booleanumToString(thing.facilities, facilityDict)}</p>
                <p>${booleanumToString(thing.appliances, applianceDict)}</p>
                <p>${booleanumToString(thing.sundryFees, sundryFeeDict)}</p>
                <navigo-a href=${`/flats/edit/${thing.id}`} title=${"修改" + subject}>
                    <span>修改</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </navigo-a>
                <navigo-a href=${`/flats/delete/${thing.id}`} title=${"删除" + subject}>
                    <span>删除</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </navigo-a>
            </section>`: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        smallSvg,
        css`
            section {
                margin: 0.8rem;
            }
        `
    ]

}