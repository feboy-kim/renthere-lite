import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { inputStyles, smallStyles } from "../my-styles";

@customElement('input-number')
export default class InputNumber extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Number }) value!: number
    @property({ type: Number }) min = 1
    @property({ type: Number }) size = 2
    @property({ type: Number }) max?: number

    protected render(): unknown {
        const maxVal = this.max ?? Math.pow(10, this.size) - 1
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <input type="number" .value=${this.value.toString()} .min=${this.min.toString()} .max=${maxVal.toString()} 
                    .size=${this.size + 1} @input=${this._onInput} />
            </fieldset>
        `
    }

    private _onInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = Number.parseInt(elem.value.trim())
        this.dispatchEvent(new CustomEvent('number-changed', {detail: {d: data}, bubbles: true, composed: false}))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css``
    ]

}