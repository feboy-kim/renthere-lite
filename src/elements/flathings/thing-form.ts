import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Flathing from "../../models/flathing";
import "../widgets/check-group"
import "../widgets/radio-group"
import "../widgets/input-text"
import { MAX_TEXT_LENGTH, MIN_TEXT_LENGTH, applianceDict, facilityDict, sundryFeeDict } from "../../models/there-m";
import { bottomFixed, submitStyles } from "../styles/edit-styles";

const canceline = "取消 ✘"

@customElement('flathing-form')
export default class FlathingForm extends LitElement {
    @property({ type: Object }) thing!: Flathing
    
    @state() private _address: string = ""
    @state() private _descrip: string = ""
    @state() private _layout: number = 0
    @state() private _storey: number = 0
    @state() private _orient: number = 0
    @state() private _facilities: number = 0
    @state() private _appliances: number = 0
    @state() private _sundryFees: number = 0

    connectedCallback() {
        super.connectedCallback()
        this._address = this.thing.address
        this._descrip = this.thing.descrip
        this._layout = this.thing.layout
        this._storey = this.thing.storey
        this._orient = this.thing.orient
        this._facilities = this.thing.facilities
        this._appliances = this.thing.appliances
        this._sundryFees = this.thing.sundryFees
    }

    _handleSubmit(e: SubmitEvent) {
        e.preventDefault()
        if ((e.submitter as HTMLInputElement).value === canceline) {
            this.dispatchEvent(new CustomEvent('submitted', { detail: {}, bubbles: true, composed: true }))
        } else {
            if (this._address && this._descrip) {
                const d = Flathing.newEntity(
                    this._address,
                    this._descrip,
                    this._layout,
                    this._storey,
                    this._orient,
                    this._facilities,
                    this._appliances,
                    this._sundryFees,
                    this.thing.id)
                this.dispatchEvent(new CustomEvent('submitted', { detail: { d }, bubbles: true, composed: true }))
            }
        }
    }

    protected render(): unknown {
        return html`<form @submit=${this._handleSubmit}>
            <div class="md-2-cols">
                <input-text label="地址" .value=${this._address} .minLength=${MIN_TEXT_LENGTH} .maxLength=${MAX_TEXT_LENGTH}
                    @text-changed=${(e: CustomEvent) => this._address = e.detail.d}></input-text>
                <input-text label="说明" .value=${this._descrip} .minLength=${MIN_TEXT_LENGTH} .maxLength=${MAX_TEXT_LENGTH}
                    @text-changed=${(e: CustomEvent) => this._descrip = e.detail.d}></input-text>
            </div>
            <div class="lg-3-cols">
                <radio-group .selected=${this._layout} .optionDict=${Flathing.layoutDict} title="户型"
                    @radio-selected=${(e: CustomEvent) => this._layout = e.detail.k}></radio-group>
                <radio-group .selected=${this._storey} .optionDict=${Flathing.storeyDict} title="楼层"
                    @radio-selected=${(e: CustomEvent) => this._storey = e.detail.k}></radio-group>
                <radio-group .selected=${this._orient} .optionDict=${Flathing.orientDict} title="朝向"
                    @radio-selected=${(e: CustomEvent) => this._orient = e.detail.k}></radio-group>
                <check-group .booleanum=${this._facilities} .optionDict=${facilityDict} title="设施" 
                    @toggle-check=${(e: CustomEvent) => this._facilities = e.detail.n}></check-group>
                <check-group .booleanum=${this._appliances} .optionDict=${applianceDict} title="电器" 
                    @toggle-check=${(e: CustomEvent) => this._appliances = e.detail.n}></check-group>
                <check-group .booleanum=${this._sundryFees} .optionDict=${sundryFeeDict} title="杂费" 
                    @toggle-check=${(e: CustomEvent) => this._sundryFees = e.detail.n}></check-group>
            </div>
            <div class="bottom-right">    
                <input type="submit" value=${canceline} formnovalidate />
                <input type="submit" value="保存 ✔" />
            </div>
        </form>`
    }


    static styles = [
        bottomFixed,
        submitStyles,
        css`
            form {
                margin: 0.2rem 0.5rem;
            }
            div.bottom-right {
                margin: 0.2rem;
            }
            div.md-2-cols, div.lg-3-cols {
                display: grid;
                grid-column-gap: 2px;
            }
            @media(min-width: 640px) {
                div.md-2-cols, div.lg-3-cols {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            @media(min-width: 960px) {
                div.lg-3-cols {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
        `
    ]

}