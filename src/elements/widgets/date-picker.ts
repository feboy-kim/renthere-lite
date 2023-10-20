import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { inputStyles, smallStyles } from "../styles/edit-styles";

const dayMillis = 24 * 36e5

@customElement('date-picker')
export default class DatePicker extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Date

    protected render(): unknown {
        const minDate = new Date(this.value.valueOf() - 30 * dayMillis).toISOString().substring(0, 10)
        const maxDate = new Date(this.value.valueOf() + 60 * dayMillis).toISOString().substring(0, 10)

        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <input type="date" .value=${this.value.toISOString().substring(0, 10)} required
                    .min=${minDate} .max=${maxDate} @change=${this._onChange} />
                <span></span>
            </fieldset>
        `
    }

    private _onChange(e: Event) {
        const elem = e.currentTarget as HTMLInputElement
        if (!Number.isNaN(elem.valueAsNumber)) {
            this.dispatchEvent(new CustomEvent('date-selected',
                { detail: { d: new Date(elem.valueAsNumber) }, bubbles: true, composed: false }))
        }
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
            span::after {
                padding-left: .2rem;
            }
            input:invalid + span::after {
                content: "wrong date";
            }
            input[type="date"] {
                cursor: text;
                display: flex;
                column-gap: 2rem;
                justify-content: space-between;
            }
        `
    ]

}