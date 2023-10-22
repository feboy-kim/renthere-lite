import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { MAX_SINO_LENGTH, MIN_SINO_LENGTH, Sumoney } from "../../models/sumoney";
import { inputStyles, smallStyles } from "../styles/edit-styles";

const sinoPattern = `\S{${MIN_SINO_LENGTH},${MAX_SINO_LENGTH}}`
const placeholder = `${MIN_SINO_LENGTH} - ${MAX_SINO_LENGTH} 个汉字`

@customElement('money-edit')
export default class MoneyEdit extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Sumoney

    protected render(): unknown {
        return html`<fieldset>
            <legend><small>${this.label}</small></legend>
            <div class="flex-group">
                <small>金额</small>
                <input type="number" .value=${this.value.numeral.toString()} min="1" max="99999" 
                    size="6" @input=${this._onNumeralInput} />
                <span class="number-validity"></span>
                <input type="text" .value=${this.value.sinoNum} pattern=${sinoPattern} .minLength=${MIN_SINO_LENGTH}
                    required .maxLength=${MAX_SINO_LENGTH}
                    .placeholder=${placeholder} @input=${this._onSinoNumInput} />
            </div>
        </fieldset>`
    }

    private _onNumeralInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = Number.parseInt(elem.value)
        this.dispatchEvent(new CustomEvent('money-changed', {detail: {...this.value, numeral: data}, bubbles: true, composed: false}))
    }

    private _onSinoNumInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = elem.value.trimStart()
        this.dispatchEvent(new CustomEvent('money-changed', {detail: {...this.value, sinoNum: data}, bubbles: true, composed: false}))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
            div.flex-group {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
            div.flex-group small {
                display: none;
                flex: none;
            }
            div.flex-group input[type="number"] {
                flex: none;
            }
            div.flex-group input[type="text"] {
                flex: 1;
            }
            @media(min-width: 640px) {
                div.flex-group small {
                    display: block;
                }
            }
            @media(min-width: 768px) {
                div.flex-group small {
                    display: none;
                }
            }
            @media(min-width: 1024px) {
                div.flex-group small {
                    display: block;
                }
            }
        `
    ]

}
