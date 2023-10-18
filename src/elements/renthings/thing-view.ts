import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLeasegg } from "../../dex/db-reader";
import "../widgets/navigo-a"
import "./person-view"
import "./money-view"
import Leasegg from "../../models/leasegg";
import Renthing from "../../models/renthing";
import { smallSvg } from "../styles/svg-styles";

const subject = "租房之约"

const arrayHtmline = (title: string, data: string[]) =>
    data.length > 0 ? html`<p>${title}:  &nbsp;${data.map(d => html`<span>${d}, &nbsp;</span>`)}</p>` : nothing

@customElement('renthing-view')
export default class RenthingView extends LitElement {
    @property({ type: Number }) thingId!: number

    private _rentask = new Task(this, {
        task: async ([id]) => await getLeasegg(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._rentask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Leasegg) => thing ? html`<section>
                <person-view label="甲方（出租人）" .value=${thing.lessor}></person-view>
                <person-view label="乙方（承租人）" .value=${thing.lessee}></person-view>
                <p>地址: ${thing.address ? html`<strong>&nbsp; ${thing.address}</strong>` : html`<strong>&nbsp; 请补充房屋信息！</strong>`}</p>
                <p>
                    <span>起始日期: &nbsp; ${thing.startDate}&nbsp;</span>
                    <span>租期: &nbsp; ${thing.leaseTerm}个月</span>
                </p>
                <money-view label="月租（元）" .value=${thing.monthFee}></money-view>
                <money-view label="押金（元）" .value=${thing.foregift}></money-view>
                <p>付款周期: &nbsp; ${thing.payCycle}个月</p>
                <p>收款账户: &nbsp; ${thing.payeeDat}</p>
                <p>租住方式: &nbsp; ${thing.shared ? "合租" : "整租"} &nbsp; </p>
                <p>${Renthing.allowanceDict.map(kv => (1 << kv[0] & thing.allowances) > 0 ?
                html`<span>允许乙方${kv[1]}&nbsp;</span>` : html`<span>禁止乙方${kv[1]}&nbsp;</span>`)}</p>
                <p>${arrayHtmline("甲方提供", thing.appliances)}</p>
                <p>${arrayHtmline("乙方杂费", thing.sundryFees)}</p>
                ${thing.supplement && html`<p>附加条款: &nbsp; ${thing.supplement}</p>`}
                <div>
                <navigo-a href=${`/rents/edit/${this.thingId}`} title=${"修改" + subject}>
                    <span>修改</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </navigo-a>
                <navigo-a href=${`/rents/delete/${this.thingId}`} title=${"删除" + subject}>
                    <span>删除</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </navigo-a>
                </div>
            </section>`: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        smallSvg,
        css`
            section {
                margin: 0.8rem;
            }
        `
    ]

}