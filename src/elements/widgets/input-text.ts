import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { inputStyles, smallStyles } from "../styles/edit-styles"

@customElement('input-text')
export default class InputText extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: String }) value!: string
    @property({ type: Number }) minLength = 0
    @property({ type: Number }) maxLength = 9
    @property({ type: String }) pattern?: string

    protected render(): unknown {
        const placeholder = this.minLength !== this.maxLength
            ? (this.minLength === 0 ? `最多 ${this.maxLength} 个字符` : `${this.minLength} - ${this.maxLength} 个字符`)
            : `${this.maxLength} 个字符`
        const textPattern = this.pattern ?? "^.{0,99}$"
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <div>
                    <input type="text" .value=${this.value} .minLength=${this.minLength} .maxLength=${this.maxLength}
                        .style=${`min-width: ${Math.max(this.minLength, 5)}rem; max-width: ${Math.max(this.maxLength, 55)}rem;`}
                        ?required=${this.minLength > 0} .placeholder=${placeholder} @input=${this._onInput} .pattern=${textPattern} />
                </div>
            </fieldset>
        `
    }

    private _onInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        this.dispatchEvent(new CustomEvent('text-changed', { detail: { d: elem.value.trimStart() }, bubbles: true, composed: false }))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
            div {
                display: grid;
            }
        `
    ]

}