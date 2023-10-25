import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { inputStyles } from "../styles/edit-styles";

@customElement('text-number')
export default class TextNumber extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: String }) value!: string
    @property({ type: Number }) minLength = 1
    @property({ type: Number }) maxLength = 9
    @property({ type: String }) pattern?: string

    protected render(): unknown {
        const placeholder = this.minLength === this.maxLength ? `${this.maxLength} 个字符` : `${this.minLength} - ${this.maxLength} 个字符`
        const textPattern = this.pattern ?? `^[0-9]{${this.minLength},${this.maxLength}}$`
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <div>
                    <input type="text" inputmode="numeric" .value=${this.value} required
                        .minLength=${this.minLength} .maxLength=${this.maxLength}
                        .style=${`min-width: ${Math.max(this.minLength, 5)}rem; max-width: ${Math.max(this.maxLength, 55)}rem;`}
                        placeholder=${placeholder} pattern=${textPattern} @input=${this._onInput} />
                </div>
            </fieldset>
      
        `
    }

    private _onInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        this.dispatchEvent(new CustomEvent('text-changed', { detail: { d: elem.value.trimStart() }, bubbles: true, composed: false }))
    }

    static styles = [
        inputStyles,
        css`
            legend small {
                opacity: 0.75;
            }
            div {
                display: grid;
            }
        `
    ]

}