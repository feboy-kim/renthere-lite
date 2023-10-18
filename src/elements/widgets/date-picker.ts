import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { inputStyles, smallStyles } from "../my-styles";

@customElement('date-picker')
export default class DatePicker extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Date

    protected render(): unknown {
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <input type="date" .value=${this.value.toISOString().substring(0, 10)} @change=${this._onChange} />
            </fieldset>
        `
    }

    private _onChange(e: Event) {
        const elem = e.currentTarget as HTMLInputElement
        this.dispatchEvent(new CustomEvent('date-selected', { detail: { d: new Date(elem.valueAsNumber) }, bubbles: true, composed: false }))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
        `
    ]

}