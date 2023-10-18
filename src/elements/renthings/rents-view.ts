import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getRentuples } from "../../dex/db-reader";
import { listStyles } from "../my-styles";
import { router } from "../../app-helper";

@customElement('renthings-view')
export default class RenthingsView extends LitElement {
    private _rentask = new Task(this, {
        task: async ([]) => await getRentuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._rentask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (tuples) => html`<ul>
                ${tuples.map(it => html`<li @click=${() => router.navigate(`/rents/view/${it.rentId}`)}>
                    <span>${it.lessor + "-:-" + it.lessee}</span>
                    <span>${Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(it.myDate)}</span>
                </li>`)}
              </ul>`,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        css`
            li {
                cursor: pointer;
                padding: 0.4rem 0.6rem;
                margin: 0.2rem;
                text-align: center;
            }
            span {
                display: block;
            }
        `
    ]

}