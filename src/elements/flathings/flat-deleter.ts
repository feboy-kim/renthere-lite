import { Task } from "@lit/task";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getFlatuple } from "../../dex/db-reader";
import { router } from "../../app-helper";
import { deleteFlathing } from "../../dex/db-writer";
import Flatuple from "../../models/flatuple";
import { largeSvg } from "../styles/svg-styles";
import { bottomFixed, submitStyles } from "../styles/edit-styles";
import { masterDetail } from "../styles/master-detail";
import { therenv } from "../../there-env";

const canceline = "取消 ✘"

@customElement('flat-deleter')
export default class FlatDeleter extends LitElement {
    @property({ type: Number }) thingId!: number

    constructor() {
        super()
        document.title = "删除房屋 - " + therenv.appName
    }

    private _task = new Task(this, {
        task: async ([id]) => await getFlatuple(id),
        args: () => [this.thingId]
    })

    _handleSubmit(e: SubmitEvent) {
        e.preventDefault()
        if ((e.submitter as HTMLInputElement).value === canceline) {
            router.navigate(`/flats/view/${this.thingId}`, { historyAPIMethod: 'replaceState' })
        } else {
            deleteFlathing(this.thingId)
                .then(() => router.navigate(`/flats/view`, { historyAPIMethod: 'replaceState' }))
                .catch(e => console.error(e))
        }
    }

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (thing?: Flatuple) => thing ? html`<form @submit=${this._handleSubmit}>
                <div class="master-detail">
                    <div class="master">
                        <h3>删除</h3>
                        <p>确定要删除《${thing.address}》的房屋数据吗？</p>
                    </div>
                    <div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                    </div>
                </div>
                <div class="bottom-right">
                    <input type="submit" value=${canceline} formnovalidate />
                    <input type="submit" value="确定 ✔" />
                </div>
            </form>`: nothing,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        largeSvg,
        masterDetail,
        bottomFixed,
        submitStyles,
        css`
            div.master {
                margin: 0.2rem;
                padding: 0.2rem 0.4rem;
            }
            div.detail-svg {
                display: flex;
                justify-content: center;
            }
            div.bottom-right {
                margin: 0.2rem;
            }
        `
    ]

}