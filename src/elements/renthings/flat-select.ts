import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";
import "../widgets/my-popover"
import { listStyles } from "../styles/view-styles";

@customElement('flat-select')
export default class FlatSelect extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Number }) flatId!: number

    private _flatask = new Task(this, {
        task: async ([]) => await getFlatuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._flatask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (flats) => {
                const current = flats.find(it => it.flatId === this.flatId)?.address ?? "选择租约之房 ..."
                return html`
                    <fieldset>
                        <legend><small>${this.label}</small></legend>
                        <my-popover .current=${current}>
                            <ul>${flats.map(it => html`
                                <li @click=${() => this._onSelected(it.flatId)}>
                                    <span>${it.address}</span>
                                </li>
                            `)}</ul>
                        </my-popover>
                    </fieldset>
            `},
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    private _onSelected(d: number) {
        this.dispatchEvent(new CustomEvent('flat-selected', { detail: { d }, bubbles: true, composed: false }))
    }

    static styles = [
        listStyles,
        css`
            ul {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }
        `
    ]

}