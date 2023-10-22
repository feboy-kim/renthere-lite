import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getRentuples } from "../../dex/db-reader";
import { router } from "../../app-helper";
import { listStyles } from "../styles/view-styles";

@customElement('renthings-view')
export default class RenthingsView extends LitElement {
    @property({ type: Number }) rentId?: number

    private _rentask = new Task(this, {
        task: async ([]) => await getRentuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._rentask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (tuples) => html`<ul>${tuples.map(it => html`
                <li .className=${this.rentId == it.rentId ? "selected" : ""} @click=${() => router.navigate(`/rents/view/${it.rentId}`)}>
                    <span>${it.lessor + " -:- " + it.lessee}</span>
                    <span>${Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(it.myDate)}</span>
                </li>`
            )}</ul>`,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        css`
            span {
                margin: 0.2rem;
            }
        `
    ]

}