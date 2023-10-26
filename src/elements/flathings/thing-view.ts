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

    private _task = new Task(this, {
        task: async ([id]) => await getFlathing(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Flathing) => thing ? html`<section>
                <h3>${thing.address}</h3>
                <p>${thing.descrip}</p>
                <p>
                    <span>${thing.myLayout}, &nbsp;</span>
                    <span>${thing.myStorey}, &nbsp;</span>
                    <span>${thing.myOrient}</span>
                </p>
                <p><small>设施:</small>&nbsp;${booleanumToString(thing.facilities, facilityDict)}</p>
                <p><small>电器:</small>&nbsp;${booleanumToString(thing.appliances, applianceDict)}</p>
                <p><small>杂费:</small>&nbsp;${booleanumToString(thing.sundryFees, sundryFeeDict)}</p>
            </section>`: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        smallSvg,
        css`
            section {
                margin: 0.2rem;
            }
            section p {
                display: flex;
                align-items: center;
                gap: 2px;
            }
            p small {
                opacity: 0.75;
            }
        `
    ]

}