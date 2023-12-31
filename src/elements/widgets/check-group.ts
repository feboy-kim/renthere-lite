import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement('check-group')
export class CheckGroup extends LitElement {
    @property({ type: Number }) booleanum: number = 0
    @property({ type: Array }) optionDict: [number, string][] = []
    @property({ type: Object }) styles = {}

    protected render(): unknown {
        return html`
            <fieldset style=${styleMap(this.styles)}>
                <legend><small>${this.title}</small></legend>
                <div>
                ${this.optionDict.map(kv => {
            const isChecked = (1 << kv[0] & this.booleanum) > 0
            return html`<label>
                    <input type="checkbox" .value=${kv[1]} ?checked=${isChecked} 
                        @change=${() => this._onChange(kv[0], isChecked)} />
                    <span>${kv[1]}</span>
                </label>`})}
                </div>
            </fieldset>
        `
    }

    private _onChange(k: number, current: boolean) {
        const n = current ? this.booleanum & ~(1 << k) : this.booleanum | 1 << k
        this.dispatchEvent(new CustomEvent('toggle-check', { detail: { n }, bubbles: true, composed: false }))
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