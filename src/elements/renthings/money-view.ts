import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { smallStyles } from "../my-styles";
import { Sumoney } from "../../models/sumoney";

@customElement('money-view')
export default class MoneyView extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Sumoney

    protected render(): unknown {
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <div>
                    <span>${`￥${this.value.numeral} (${this.value.sinoNum})`}</span>
                </div>
            </fieldset>        
        `
    }

    static styles = [
        smallStyles,
        css`
        `
    ]

}
