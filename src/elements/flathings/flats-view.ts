import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";
import { listStyles } from "../styles/list-styles";
import { linkStyles } from "../styles/link-styles";

@customElement('flathings-view')
export default class FlathingsView extends LitElement {
    @property({ type: Number }) flatId?: number

    private _task = new Task(this, {
        task: async ([]) => await getFlatuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (tuples) => tuples.length > 0 ? html`<ul>${tuples.map(it => html`
                <li .className=${this.flatId == it.flatId ? "selected" : ""}>
                    <a href=${`#/flats/view/${it.flatId}`} data-navigo>${it.address}</a>
                </li>`
            )}</ul>` : html`<p>
                <a href="#/flats/edit" data-navigo>添加房屋记录 ...</a>
            </p>`,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        linkStyles,
        css`
            li a {
                margin: 0.2rem;
            }
            p {
                text-align: center;
            }
        `
    ]

}