import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getRentuple } from "../../dex/db-reader";
import Rentuple from "../../models/rentuple";
import { deleteRenthing } from "../../dex/db-writer";
import { router } from "../../app-helper";
import { largeSvg } from "../styles/svg-styles";
import { bottomRight, flexButton } from "../styles/edit-styles";
import { masterDetail } from "../styles/master-detail";

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
                <div class="master-detail">
                    <div class="master">
                        <h3>删除</h3>
                        <p>确定要删除《${thing.lessor + "-:-" + thing.lessee}》的租约数据吗？</p>
                    </div>
                    <div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                </div>
                <div class="bottom-right">
                    <button type="button" @click=${() => router.navigate(`/rents/view/${this.thingId}`)} class="flex-button">
                        <span>取消 \u2718</span>
                    </button>
                    <button type="button" @click=${() => deleteRenthing(thing.rentId)
                    .then(() => router.navigate(`/rents/view`, { historyAPIMethod: 'replaceState' })
                    ).catch(e => console.error(e))} class="flex-button">
                        <span>确定 \u2714</span>
                    </button>
                </div>
            `: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        largeSvg,
        masterDetail,
        flexButton,
        bottomRight,
        css`
            div.bottom-right {
                margin: 0.2rem;
            }
        `
    ]

}