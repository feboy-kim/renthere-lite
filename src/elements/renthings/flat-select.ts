import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";
import "../widgets/my-popover"
import { listStyles } from "../styles/view-styles";
import { linkStyles } from "../styles/link-styles";

@customElement('flat-select')
export default class FlatSelect extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Number }) flatId!: number

    private _task = new Task(this, {
        task: async ([]) => await getFlatuples(),
        args: () => []
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (flats) => {
                const selected = flats.find(it => it.flatId === this.flatId)
                return html`<fieldset>
                    <legend><small>${this.label}</small></legend>
                    ${flats.length > 0
                        ? html`<section><my-popover .current=${selected?.address ?? "选择租约之房 ..."}>
                            <ul>${flats.map(it => html`
                                <li @click=${() => this._onSelected(it.flatId)}>
                                    <span>${it.address}</span>
                                </li>
                            `)}</ul>
                        </my-popover>
                        ${selected ? html`` : html`<span class="no-selected">\u2753</span>`}</section>`
                        : html`<div>
                            <a href="/flats/edit" data-navigo>添加房屋记录 ...</a>
                        </div>`}
                </fieldset>`},
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    private _onSelected(d: number) {
        this.dispatchEvent(new CustomEvent('flat-selected', { detail: { d }, bubbles: true, composed: false }))
    }

    static styles = [
        listStyles,
        linkStyles,
        css`
            section {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
            ul {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }
            li {
                padding-right: 1.5rem
            }
            span.no-selected {
                padding: 0.2rem;
            }
        `
    ]

}