import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLeasegg } from "../../dex/db-reader";
import "./person-view"
import "./sumoney-view"
import Leasegg from "../../models/leasegg";
import Renthing from "../../models/renthing";
import { smallSvg } from "../styles/svg-styles";
import { linkStyles } from "../styles/link-styles";

const arrayHtmline = (title: string, data: string[]) =>
    data.length > 0 ? html`<p><small>${title}:</small>  &nbsp;${data.map(d => html`<span>${d}, &nbsp;</span>`)}</p>` : nothing

@customElement('renthing-view')
export default class RenthingView extends LitElement {
    @property({ type: Number }) thingId!: number

    private _task = new Task(this, {
        task: async ([id]) => await getLeasegg(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Leasegg) => thing ? html`<section>
                <person-view label="甲方（出租人）" .value=${thing.lessor}></person-view>
                <person-view label="乙方（承租人）" .value=${thing.lessee}></person-view>
                <p><small>地址:</small> ${thing.address
                    ? html`<strong>&nbsp; ${thing.address}</strong>`
                    : html`<strong>&nbsp; <a href="/flats/view" title="租约之房" data-navigo>请补充房屋信息！</a></strong>`}</p>
                <money-view label="月租（元）" .value=${thing.monthFee}></money-view>
                <money-view label="押金（元）" .value=${thing.foregift}></money-view>
                <p><small>起始日期: </small>&nbsp; ${thing.startDate}&nbsp;</p>
                <p><small>租期: </small>&nbsp; ${thing.leaseTerm}个月,&nbsp;<small>付款周期:</small> &nbsp; ${thing.payCycle}个月</p>
                <div><small>约定:</small> &nbsp; 
                    ${Renthing.allowanceDict.map(kv => (1 << kv[0] & thing.allowances) > 0 ?
                        html`<span>允许乙方${kv[1]}</span>,&nbsp;` : html`<span>禁止乙方${kv[1]}</span>,&nbsp;`)}
                    <span>${thing.shared ? "合租" : "整租"} &nbsp;</span> 
                </div>
                <p>${arrayHtmline("甲方提供", thing.appliances)}</p>
                <p>${arrayHtmline("乙方杂费", thing.sundryFees)}</p>
                ${thing.supplement && html`<p><small>附加条款:</small> &nbsp; ${thing.supplement}</p>`}
            </section>`: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        smallSvg,
        linkStyles,
        css`
            section {
                margin: 0.5rem;
            }
            section small {
                opacity: 0.75;
            }
        `
    ]

}