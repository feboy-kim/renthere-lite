import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./thing-view"
import "./flats-view"
import "../widgets/edit-links"
import { largeSvg } from "../styles/svg-styles";
import { masterDetail } from "../styles/master-detail";
import { bottomFixed } from "../styles/edit-styles";
import { therenv } from "../../there-env";

const subject = "租约之房"

@customElement('flathings-index')
export default class FlathingsIndex extends LitElement {
    @property({ type: Number }) thingId?: number

    constructor() {
        super()
        document.title = subject + " - " + therenv.appName
    }

    protected render(): unknown {
        return html`
            <div class="master-detail">
                <flathings-view .className=${this.thingId ? "drawer" : "master"} .flatId=${this.thingId}></flathings-view>
                ${this.thingId ? html`<flathing-view .thingId=${this.thingId} class="detail"></flathing-view>`
                : html`<div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                    </div>`}
            </div>
            <div class="bottom-left">
                ${this.thingId ? html`<create-link href="#/flats/edit"></create-link>` : nothing}
            </div>
            <div class="bottom-right">
                ${this.thingId ? html`
                    <update-link href=${`#/flats/edit/${this.thingId}`}></update-link>
                    <delete-link href=${`#/flats/delete/${this.thingId}`}></delete-link>
                ` : html`<create-link href="#/flats/edit"></create-link>`}
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