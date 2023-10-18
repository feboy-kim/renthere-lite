import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Renthing from "../../models/renthing";
import { MAX_TEXT_LENGTH } from "../../models/there-m";
import "../widgets/input-number"
import "../widgets/input-text"
import "../widgets/check-group"
import "../widgets/radio-group"
import "../widgets/date-picker"
import "./money-edit"
import "./person-edit"
import "./flat-select"
import { Person } from "../../models/person";
import { Sumoney } from "../../models/sumoney";

@customElement('renthing-form')
export default class RenthingForm extends LitElement {
    @property({ type: Object }) thing!: Renthing
    
    @state() private _lessor!: Person
    @state() private _lessee!: Person
    @state() private _flatId!: number
    @state() private _shared!: boolean
    @state() private _monthFee!: Sumoney
    @state() private _foregift!: Sumoney
    @state() private _startDate!: Date
    @state() private _leaseTerm!: number
    @state() private _payeeDat!: string
    @state() private _payCycle!: number
    @state() private _allowances!: number
    @state() private _supplement!: string

    connectedCallback() {
        super.connectedCallback()
        this._lessor = this.thing.lessor
        this._lessee = this.thing.lessee
        this._flatId = this.thing.flatId
        this._shared = this.thing.shared
        this._monthFee = this.thing.monthFee
        this._foregift = this.thing.foregift
        this._startDate = this.thing.startDate
        this._leaseTerm = this.thing.leaseTerm
        this._payeeDat = this.thing.payeeDat
        this._payCycle = this.thing.payCycle
        this._allowances = this.thing.allowances
        this._supplement = this.thing.supplement
    }

    private readonly _canceline = "取消"

    _handleSubmit(e: SubmitEvent) {
        e.preventDefault()
        if ((e.submitter as HTMLInputElement).value === this._canceline) {
            this.dispatchEvent(new CustomEvent('submitted', { detail: {}, bubbles: true, composed: true }))
        } else {
            const d = Renthing.newEntity(
                this._lessor,
                this._lessee,
                this._flatId,
                this._shared,
                this._monthFee,
                this._foregift,
                this._startDate,
                this._leaseTerm,
                this._payeeDat.trim(),
                this._payCycle,
                this._allowances,
                this._supplement.trim(),
                this.thing.id)
            this.dispatchEvent(new CustomEvent('submitted', { detail: { d }, bubbles: true, composed: true }))
        }
    }

    protected render(): unknown {
        return html`<form @submit=${this._handleSubmit}>
            <person-edit label="甲方（出租人）" .value=${this._lessor}
                @person-changed=${(e: CustomEvent) => this._lessor = e.detail}></person-edit>
            <person-edit label="乙方（承租人）" .value=${this._lessee}
                @person-changed=${(e: CustomEvent) => this._lessee = e.detail}></person-edit>
            <flat-select label="可用房屋" .flatId=${this._flatId}
                @flat-selected=${(e: CustomEvent) => this._flatId = e.detail.d}></flat-select>
            <radio-group .selected=${this._shared ? 1 : 0} .optionDict=${Renthing.flatSharedDict} title="整租还是合租"
                @radio-selected=${(e: CustomEvent) => this._shared = e.detail.k > 0}></radio-group>
            <check-group .booleanum=${this._allowances} .optionDict=${Renthing.allowanceDict} title="允许乙方" 
                @toggle-check=${(e: CustomEvent) => this._allowances = e.detail.n}></check-group>
            <date-picker label="起始日期" .value=${this._startDate} 
                @date-selected=${(e: CustomEvent) => this._startDate = e.detail.d}></date-picker>
            <money-edit label="月租（元）" .value=${this._monthFee}
                @money-changed=${(e: CustomEvent) => this._monthFee = e.detail}></money-edit>
            <money-edit label="押金（元）" .value=${this._foregift}
                @money-changed=${(e: CustomEvent) => this._foregift = e.detail}></money-edit>
            <input-number label="租期（月）" .value=${this._leaseTerm} 
                @number-changed=${(e: CustomEvent) => this._leaseTerm = e.detail.d}></input-number>
            <input-number label="付款周期（月）" .value=${this._payCycle} .max=${this._leaseTerm}
                @number-changed=${(e: CustomEvent) => this._payCycle = e.detail.d}></input-number>
            <input-text label="收款账户" .value=${this._payeeDat} .maxLength=${MAX_TEXT_LENGTH}
                @text-changed=${(e: CustomEvent) => this._payeeDat = e.detail.d}></input-text>
            <input-text label="附加条款" .value=${this._supplement} .maxLength=${MAX_TEXT_LENGTH}
                @text-changed=${(e: CustomEvent) => this._supplement = e.detail.d}></input-text>

            <div class="submitter">    
                <input type="submit" value=${this._canceline} formnovalidate />
                <input type="submit" value="保存" />
            </div>
        </form>`
    }

    static styles = [
        css`
            input[type='submit'] {
                font-size: initial;
                cursor: pointer;
                padding: 0.3rem 0.6rem;
            }
            div.submitter {
                margin: 0.2rem;
            }
        
        `
    ]

}