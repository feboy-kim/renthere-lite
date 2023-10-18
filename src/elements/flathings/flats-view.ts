import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";
import { listStyles } from "../my-styles";
import { router } from "../../app-helper";

@customElement('flathings-view')
export default class FlathingsView extends LitElement {
    private _flatask = new Task(this, {
        task: async ([]) => await getFlatuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._flatask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (tuples) => html`<ul>
                ${tuples.map(it => html`<li @click=${() => router.navigate(`/flats/view/${it.flatId}`)}>
                    ${it.address}
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
        `
    ]

}