import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLeasegg } from "../../dex/db-reader";
import { leaseDetail } from "../../cloud/lease-detail";
import "./lease-links"
import { listStyles } from "../styles/view-styles";
import { linkStyles } from "../styles/link-styles";
import { bottomFixed } from "../styles/edit-styles";

@customElement('lease-view')
export default class LeaseView extends LitElement {
    @property({ type: Number }) thingId!: number

    private _task = new Task(this, {
        task: async ([id]) => await leaseDetail(await getLeasegg(id)),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (detail) => detail ? html`
                <h3>房屋租赁合同</h3>
                <p>${detail.firstext}</p>
                <div class="bottom-right">
                    <lease-link href=${`/lease/pdfile/${this.thingId}`}></lease-link>
                </div>
            ` : nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        linkStyles,
        bottomFixed,
        css``
    ]
}