import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { smallStyles } from "../my-styles";
import { Person } from "../../models/person";

@customElement('person-view')
export default class PersonView extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Person

    protected render(): unknown {
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <h3>${this.value.realName}</h3>
                <div>手机: &nbsp; ${this.value.phoneNum}</div>
                <div>身份证: &nbsp; ${this.value.personId}</div>
            </fieldset>        
        `
    }

    static styles = [
        smallStyles,
        css`
        `
    ]

}
