import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../../models/person";

@customElement('person-view')
export default class PersonView extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Person

    protected render(): unknown {
        return html`<section>
                <small>${this.label}: &nbsp;</small>
                <div>
                    <div class="one-line">
                        <strong>${this.value.realName}, &nbsp;</strong>
                        <div>手机: &nbsp; ${this.value.phoneNum}</div>
                    </div>
                    <div>身份证: &nbsp; ${this.value.personId}</div>
                </div>
            </section>`
    }

    static styles = [
        css`
            section {
                display: flex;
                align-items: center;
            }
            section strong {
                font-size: large;
            }
            section small {
                opacity: 0.7;
            }
            div.one-line {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
        `
    ]

}
