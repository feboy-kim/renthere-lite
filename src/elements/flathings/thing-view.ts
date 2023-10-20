import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlathing } from "../../dex/db-reader";
import Flathing from "../../models/flathing";
import { applianceDict, booleanumToString, facilityDict, sundryFeeDict } from "../../models/there-m";
import { smallSvg } from "../styles/svg-styles";

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