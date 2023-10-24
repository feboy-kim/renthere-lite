import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./thing-view"
import "./rents-view"
import "../widgets/edit-links"
import "../leases/lease-links"
import { largeSvg } from "../styles/svg-styles";
import { masterDetail } from "../styles/master-detail";
import { bottomFixed } from "../styles/edit-styles";
import { therenv } from "../../there-env";

const subject = "租房之约"

@customElement('renthings-index')
export default class RenthingsIndex extends LitElement {
    @property({ type: Number }) thingId?: number

    constructor() {
        super()
        document.title = subject + " - " + therenv.appName
    }

    protected render(): unknown {
        return html`
            <div class="master-detail">
                <renthings-view .className=${this.thingId ? "drawer" : "master"} .rentId=${this.thingId}></renthings-view>
                ${this.thingId ? html`<renthing-view .thingId=${this.thingId} class="detail"></renthing-view>`
                : html`<div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>`}
            </div>
            <div class="bottom-left">
                ${this.thingId ? html`<create-link href="#/rents/edit"></create-link>` : nothing}
            </div>
            <div class="bottom-right">
                ${this.thingId ? html`
                    <update-link href=${`#/rents/edit/${this.thingId}`}></update-link>
                    <delete-link href=${`#/rents/delete/${this.thingId}`}></delete-link>
                    <detail-link href=${`#/lease/${this.thingId}`}></detail-link>
                ` : html`<create-link href="#/rents/edit"></create-link>`}
            </div>
        `
    }

    static styles = [
        largeSvg,
        masterDetail,
        bottomFixed,
        css`
            div.detail-svg {
                display: flex;
                justify-content: center;
            }

        `
    ]

}