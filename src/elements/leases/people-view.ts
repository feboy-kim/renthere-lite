import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Person } from "../../models/person";

@customElement('people-view')
export default class PeopleView extends LitElement {
    @property({ type: Object }) lessor!: Person
    @property({ type: Object }) lessee!: Person

    protected render(): unknown {
        return html`<div class="people">
                <section>
                    <span>甲方（出租）: &nbsp;</span>
                    <div>
                        <div class="one-line">
                            <strong>${this.lessor.realName}, &nbsp;</strong>
                            <div>手机: &nbsp; ${this.lessor.phoneNum}</div>
                        </div>
                        <div>身份证: &nbsp; ${this.lessor.personId}</div>
                    </div>
                </section>
                <section>
                    <span>乙方（承租）: &nbsp;</span>
                    <div>
                        <div class="one-line">
                            <strong>${this.lessee.realName}, &nbsp;</strong>
                            <div>手机: &nbsp; ${this.lessee.phoneNum}</div>
                        </div>
                        <div>身份证: &nbsp; ${this.lessee.personId}</div>
                    </div>
                </section>
            </div>`
    }

    static styles = [
        css`
            div.people {
                margin: 0.2rem 0.5rem;
                display: flex;
                flex-flow: row wrap;
                gap: 8px;
            }
            section {
                display: flex;
                flex-flow: row nowrap;
                gap: 2px;
            }
            section > span {
                flex: none;
            }
            div.one-line {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
        `
    ]

}
