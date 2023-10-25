import { Task } from "@lit/task";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";
import "../widgets/my-popover"
import { listStyles } from "../styles/list-styles";
import { linkStyles } from "../styles/link-styles";
import { router } from "../../app-helper";

@customElement('flat-select')
export default class FlatSelect extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Number }) flatId!: number

    private _task = new Task(this, {
        task: async ([]) => await getFlatuples(),
        args: () => []
    })

    protected render(): unknown {
        const hashold = router.getCurrentLocation().hashString
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (flats) => {
                const selected = flats.find(it => it.flatId === this.flatId)
                return html`<fieldset>
                    <legend><small>${this.label}</small></legend>
                    ${flats.length > 0
                        ? html`<div class="flat-list"><my-popover .current=${selected?.address ?? "选择租约之房 ..."}>
                            <ul>${flats.map(it => html`
                                <li @click=${() => this._onSelected(it.flatId)}>
                                    <span>${it.address}</span>
                                </li>
                            `)}</ul>
                        </my-popover>${selected?.address ? html`` : html`<span>\u2753</span>`}</div>`
                        : html`<div>
                            <a href=${`#/flats/edit?from=${hashold}`} data-navigo>添加房屋记录 ...</a>
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
            div.flat-list {
                display: flex;
                gap: 4px;
            }
            ul {
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
            }
            li {
                padding-right: 1.5rem;
            }
            span {
                padding: 0.2rem;
            }
        `
    ]

}