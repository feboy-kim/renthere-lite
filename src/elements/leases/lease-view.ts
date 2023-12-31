import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getLeasegg } from "../../dex/db-reader";
import { leaseDetail } from "../../cloud/lease-detail";
import "./lease-links"
import "../widgets/edit-links"
import "./people-view"
import { listStyles } from "../styles/list-styles";
import { linkStyles } from "../styles/link-styles";
import { bottomFixed } from "../styles/edit-styles";
import { therenv } from "../../there-env";
import { router } from "../../app-helper";

@customElement('lease-view')
export default class LeaseView extends LitElement {
    @property({ type: Number }) thingId!: number

    constructor() {
        super()
        document.title = "协议 - " + therenv.appName
    }
    
    private _task = new Task(this, {
        task: async ([id]) => {
            const lease = await getLeasegg(id)
            return {
                lease,
                detail: await leaseDetail(lease)
            }
        },
        args: () => [this.thingId]
    })

    protected render(): unknown {
        const hashold = router.getCurrentLocation().hashString
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (pair) => pair.lease ? html`
                <div class="agreement">
                    <h3>房屋租赁合同</h3>
                    <people-view .lessor=${pair.lease.lessor} .lessee=${pair.lease.lessee}></people-view>
                    ${pair.detail ? html`
                        <p style="margin: 0.2rem 0.5rem;">${pair.detail.firstext}</p>
                        ${pair.detail.articles.map((d, i) => html`<article>
                            <h4 style="margin: 0.2rem;">${i + 1}. &nbsp; ${d.subtitle}</h4>
                            <div>${d.contents.map((t) => html`<span>${t}</span>`)}</div>
                        </article>`)}
                    ` : nothing}
                </div>
                <div class="bottom-right">
                    <update-link href=${`#/rents/edit/${this.thingId}?from=${hashold}`}></update-link>
                    <pdfile-link href=${therenv.apiBase + `/pdfile?egg=${encodeURIComponent(JSON.stringify(pair.lease))}`}></pdfile-link>
                </div>
            ` : nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        listStyles,
        linkStyles,
        bottomFixed,
        css`
            div.agreement {
                margin: 0.2rem;
            }
            h3, h4 {
                padding: 0.2rem 0.5rem;
            }
            article div {
                padding: 0.2rem 0.5rem;
            }

            div > span {
                display: block;
                margin: 0.1rem 0.1rem 0.1rem 1.0rem;
            }
        `
    ]
}