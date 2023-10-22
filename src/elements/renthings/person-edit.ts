import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PERSONID_LENGTH, PHONENUM_LENGTH, Person } from "../../models/person";
import { inputStyles, smallStyles } from "../styles/edit-styles";

const realNamePattern = `^\S.{${NAME_MIN_LENGTH - 2},${NAME_MAX_LENGTH - 2}}\S$`
const realNamePlaceholder = `${NAME_MIN_LENGTH} - ${NAME_MAX_LENGTH}个汉字`
const personIdPattern = `[1-9]\d{16}(\d|x|X)`
const personIdPlaceholder = `${PERSONID_LENGTH}位身份证编号`
const phoneNumPattern = `1\d{10}`
const phoneNumPlaceholder = `${PHONENUM_LENGTH}位手机号码`

@customElement('person-edit')
export default class PersonEdit extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Person

    protected render(): unknown {
        return html`<fieldset>
            <legend><small>${this.label}</small></legend>
            <div class="container">
                <div class="flex-group">
                    <small>姓名</small>
                    <input type="text" .value=${this.value.realName} .minLength=${NAME_MIN_LENGTH}
                        required .maxLength=${NAME_MAX_LENGTH} pattern=${realNamePattern}
                        .placeholder=${realNamePlaceholder} @input=${this._onRealNameInput} />
                </div>
                <div class="flex-group">
                    <small>手机</small>
                    <input type="text" .value=${this.value.phoneNum} 
                        required .maxLength=${PHONENUM_LENGTH} pattern=${phoneNumPattern} 
                        .placeholder=${phoneNumPlaceholder} @input=${this._onPhoneNumInput} />
                </div>
                <div class="flex-group">
                    <small>身份证</small>
                    <input type="text" .value=${this.value.personId} 
                        required .maxLength=${PERSONID_LENGTH} pattern=${personIdPattern} title="身份证编号"
                        .placeholder=${personIdPlaceholder} @input=${this._onPersonIdInput} />
                </div>
            </div>
        </fieldset>`
    }

    private _onRealNameInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = elem.value.trimStart()
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, realName: data }, bubbles: true, composed: false }))
    }

    private _onPhoneNumInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = elem.value.trimStart()
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, phoneNum: data }, bubbles: true, composed: false }))
    }
    private _onPersonIdInput(e: InputEvent) {
        const elem = e.currentTarget as HTMLInputElement
        const data = elem.value.trimStart()
        this.dispatchEvent(new CustomEvent('person-changed',
            { detail: { ...this.value, personId: data }, bubbles: true, composed: false }))
    }

    static styles = [
        smallStyles,
        inputStyles,
        css`
            div.container {
                display: grid;
                grid-template-columns: 3fr 6fr 9fr;
            }
            div.flex-group small {
                display: block;
            }
            div.flex-group input {
                display: block;
                box-sizing: border-box;
                width: 100%;
            }
        `
    ]

}
