import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuple } from "../../dex/db-reader";
import { router } from "../../app-helper";
import { deleteFlathing } from "../../dex/db-writer";
import "../widgets/link-button"
import Flatuple from "../../models/flatuple";
import { smallSvg } from "../styles/svg-styles";

@customElement('flat-deleter')
export default class FlatDeleter extends LitElement {
    @property({ type: Number }) thingId!: number

    private _flatask = new Task(this, {
        task: async ([id]) => await getFlatuple(id),
        args: () => [this.thingId]
    })

    protected render(): unknown {
        return this._flatask.render({
            pending: () => html`<p>Loading ...</p>`,
            complete : (thing?: Flatuple) => thing ? html`
                <h2>删除</h2>
                <p>确定要删除《${thing.address}》的房屋数据吗？</p>
                <link-button href=${`/flats/view/${this.thingId}`}>
                    <span>取消</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </link-button>
                <button type="button" @click=${() => {
                    deleteFlathing(thing.flatId).then(() => {
                        router.navigate(`/flats/view`, { historyAPIMethod: 'replaceState' })
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