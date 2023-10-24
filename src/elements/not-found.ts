import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { largeSvg } from "./styles/svg-styles";
import { masterDetail } from "./styles/master-detail";
import { therenv } from "../there-env";

@customElement('not-found')
export default class NotFound extends LitElement {
    constructor() {
        super()
        document.title = "迷路了 - " + therenv.appName
    }

    protected render(): unknown {
        return html`<div class="master-detail">
            <p class="master">路径错误，迷路了！</p>
            <div class="detail-svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="large-svg">
                <path stroke-linecap="round" stroke-linejoin="round" 
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
            </div>
        </div>`
    }

    static styles = [
        largeSvg,
        masterDetail,
        css`
            p.master {
                color: tomato;
                font-size: large;
                text-align: center;
            }
            div.detail-svg {
                display: flex;
                justify-content: center;
            }

        `
    ]

}