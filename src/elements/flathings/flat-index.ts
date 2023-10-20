import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./thing-view"
import "./flats-view"
import { largeSvg, smallSvg } from "../styles/svg-styles";
import { masterDetail } from "../styles/master-detail";
import { bottomRight } from "../styles/edit-styles";
import { linkStyles } from "../styles/link-styles";

const subject = "租约之房"

@customElement('flathings-index')
export default class FlathingsIndex extends LitElement {
    @property({ type: Number }) thingId?: number

    constructor() {
        super()
        document.title = "租约之房"
    }
    
    protected render(): unknown {
        return html`
            <div class="master-detail">
                <flathings-view .className=${this.thingId ? "drawer" : "master"}></flathings-view>
                ${this.thingId ? html`<flathing-view .thingId=${this.thingId} class="detail"></flathing-view>`
                    : html`<div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                    </div>`}
            </div>
            <div class="bottom-right">
                <a href="/flats/edit" title=${"新建" + subject} class="rounded-flex" data-navigo>
                    <span>新建 \u271A</span>
                </a>
                ${this.thingId ? html`
                    <a href=${`/flats/edit/${this.thingId}`} title=${"修改" + subject} class="rounded-flex" data-navigo>
                        <span>修改</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </a>
                    <a href=${`/flats/delete/${this.thingId}`} title=${"删除" + subject} class="rounded-flex" data-navigo>
                        <span>删除</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                ` : nothing}
            </div>
        `
    }

    static styles = [
        smallSvg,
        largeSvg,
        masterDetail,
        bottomRight,
        linkStyles,
        css`
        `
    ]

}