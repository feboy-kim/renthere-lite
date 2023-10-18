import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { smallStyles } from "../my-styles";
import { styleMap } from "lit/directives/style-map.js";

@customElement('radio-group')
export class RadioGroup extends LitElement {
    @property({ type: Number }) selected: Number = 0
    @property({ type: Array }) optionDict: [number, string][] = []
    @property({ type: Object }) styles = {}

    protected render(): unknown {
        return html`
            <fieldset style=${styleMap(this.styles)}>
                <legend><small>${this.title}</small></legend>
                ${this.optionDict.map(kv => html`<label>
                    <input type="radio" .name=${this.title} .value=${kv[1]} ?checked=${this.selected === kv[0]} 
                        @change=${() => this._onChange(kv[0])} />
                    <span>${kv[1]}</span>
                </label>`)}
            </fieldset>
        `
    }

    private _onChange(k: number) {
        this.dispatchEvent(new CustomEvent('radio-selected', { detail: { k }, bubbles: true, composed: false }))
    }

    static styles = [
        smallStyles,
        css`
        `
    ]

}