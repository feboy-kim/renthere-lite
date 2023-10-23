import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getRentuples } from "../../dex/db-reader";
import { router } from "../../app-helper";
import { listStyles } from "../styles/view-styles";
import { linkStyles } from "../styles/link-styles";

@customElement('renthings-view')
export default class RenthingsView extends LitElement {
    @property({ type: Number }) rentId?: number

    private _task = new Task(this, {
        task: async ([]) => await getRentuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (tuples) => tuples.length > 0 ?  html`<ul>${tuples.map(it => html`
                <li .className=${this.rentId == it.rentId ? "selected" : ""} @click=${() => router.navigate(`/rents/view/${it.rentId}`)}>
                    <span>${it.lessor + " -:- " + it.lessee}</span>
                    <span>${Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(it.myDate)}</span>
                </li>`
            )}</ul>` : html`<p>
                <a href="/rents/edit" data-navigo>添加租约记录 ...</a>
            </p>`,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        linkStyles,
        css`
            span {
                margin: 0.2rem;
            }
        `
    ]

}