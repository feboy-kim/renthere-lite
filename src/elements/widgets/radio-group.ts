import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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
                <div>
                ${this.optionDict.map(kv => html`<label>
                    <input type="radio" .name=${this.title} .value=${kv[1]} ?checked=${this.selected === kv[0]} 
                        @change=${() => this._onChange(kv[0])} />
                    <span>${kv[1]}</span>
                </label>`)}
    </div>
            </fieldset>
        `
    }

    private _onChange(k: number) {
        this.dispatchEvent(new CustomEvent('radio-selected', { detail: { k }, bubbles: true, composed: false }))
    }

    static styles = [
        css`
            legend small {
                opacity: 0.75;
            }
            div {
                display: flex;
                flex-flow: row wrap;
                gap: 4px;
            }
            label {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
            label > span {
                flex: none;
            }
        `
    ]

}