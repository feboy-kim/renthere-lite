import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./thing-view"
import "./rents-view"
import { largeSvg, smallSvg } from "../styles/svg-styles";
import { masterDetail } from "../styles/master-detail";
import { bottomRight } from "../styles/edit-styles";
import { linkStyles } from "../styles/link-styles";

const subject = "租房之约"

@customElement('renthings-index')
export default class RenthingsIndex extends LitElement {
    @property({ type: Number }) thingId?: number

    constructor() {
        super()
        document.title = "租房之约"
    }

    protected render(): unknown {
        return html`
            <div class="master-detail">
                <renthings-view .className=${this.thingId ? "drawer" : "master"}></renthings-view>
                ${this.thingId ? html`<renthing-view .thingId=${this.thingId} class="detail"></renthing-view>`
                    : html`<div class="detail-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>`}
            </div>
            <div class="bottom-right">
                <a href="/rents/edit" title=${"新建" + subject} class="rounded-flex" data-navigo>
                    <span>新建 \u271A</span>
                </a>
                ${this.thingId ? html`
                    <a href=${`/rents/edit/${this.thingId}`} title=${"修改" + subject} class="rounded-flex" data-navigo>
                        <span>修改</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </a>
                    <a href=${`/rents/delete/${this.thingId}`} title=${"删除" + subject} class="rounded-flex" data-navigo>
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