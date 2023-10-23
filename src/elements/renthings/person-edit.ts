import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
    NAME_MAX_LENGTH, NAME_MIN_LENGTH, PERSONID_LENGTH, PHONENUM_LENGTH,
    Person, personIdPattern, phoneNumPattern, realNamePattern
} from "../../models/person";
import { inputStyles, smallStyles } from "../styles/edit-styles";
import "../widgets/input-text"

@customElement('person-edit')
export default class PersonEdit extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Person

    protected render(): unknown {
        return html`<div class="container">
            <input-text label=${this.label + "姓名"} .value=${this.value.realName} style="flex: 1"
                @text-changed=${this._onRealName}
                .minLength=${NAME_MIN_LENGTH} .maxLength=${NAME_MAX_LENGTH} pattern=${realNamePattern}></input-text>
            <input-text label=${this.label + "手机"} .value=${this.value.phoneNum} style="flex: 2"
                @text-changed=${this._onPhoneNum}
                .minLength=${PHONENUM_LENGTH} .maxLength=${PHONENUM_LENGTH} pattern=${phoneNumPattern}></input-text>
            <input-text label=${this.label + "身份证"} .value=${this.value.personId} style="flex: 3"
                @text-changed=${this._onPersonId}
                .minLength=${PERSONID_LENGTH} .maxLength=${PERSONID_LENGTH} pattern=${personIdPattern}></input-text>
        </div>`
    }

    private _onRealName(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, realName: e.detail.d }, bubbles: true, composed: false }))
    }
    private _onPhoneNum(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, phoneNum: e.detail.d }, bubbles: true, composed: false }))
    }
    private _onPersonId(e: CustomEvent) {
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, personId: e.detail.d }, bubbles: true, composed: false }))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
            div.container {
                display: flex;
                flex-flow: row wrap;
                gap: 2px;
            }
        `
    ]

}
