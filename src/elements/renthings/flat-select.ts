import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuples } from "../../dex/db-reader";

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
                return html`
                    <fieldset>
                        <legend><small>${this.label}</small></legend>
                        <select required @change=${this._onSelected}>
                            ${flats.find(it => it.flatId === this.flatId) ? nothing: html`<option value="">选择租约之房 ...</option>`}
                            ${flats.map(it => html`
                                <option .selected=${it.flatId === this.flatId} .value=${it.flatId!.toString()}>
                                    ${it.address}
                                </option>
                            `)}
                            </select>
                    </fieldset>
            `},
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    private _onSelected(e: Event) {
        const elem = e.currentTarget as HTMLSelectElement
        const data = Number.parseInt(elem.value)
        this.dispatchEvent(new CustomEvent('flat-selected', {detail: {d: data}, bubbles: true, composed: false}))
    }

    static styles = [
        css`
            select {
                padding: 0.3rem 0.6rem;
            }
        `
    ]

}