import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getRentuple } from "../../dex/db-reader";
import Rentuple from "../../models/rentuple";
import { deleteRenthing } from "../../dex/db-writer";
import { router } from "../../app-helper";
import "../widgets/link-button"
import { smallSvg } from "../styles/svg-styles";

@customElement('rent-deleter')
export default class RentDeleter extends LitElement {
    @property({ type: Number }) thingId!: number

    private _flatask = new Task(this, {
        task: async ([id]) => await getRentuple(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._flatask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Rentuple) => thing ? html`
                <h2>删除</h2>
                <p>确定要删除《${thing.lessor + "-:-" + thing.lessee}》的租约数据吗？</p>
                <link-button href=${`/rents/view/${this.thingId}`}>
                    <span>取消</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </link-button>
                <button type="button" @click=${() => {
                    deleteRenthing(thing.rentId).then(() => {
                        router.navigate(`/rents/view`, { historyAPIMethod: 'replaceState' })
                    }).catch(e => console.error(e))
                }}>
                    <span>确定</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </button>
            `: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        smallSvg,
        css`
        `
    ]

}