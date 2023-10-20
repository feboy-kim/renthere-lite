import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Sumoney } from "../../models/sumoney";
import { sectionView } from "../styles/view-styles";

@customElement('money-view')
export default class MoneyView extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Sumoney

    protected render(): unknown {
        return html`<section>
            <small>${this.label}</small>
            <div>
                <span>${`￥${this.value.numeral} (${this.value.sinoNum})`}</span>
            </div>
        </section>`
    }

    static styles = [
        sectionView,
        css`
            
        `
    ]

}
