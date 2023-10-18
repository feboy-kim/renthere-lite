import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./thing-view"
import "./flats-view"
import "../widgets/navigo-a"
import { largeSvg, smallSvg } from "../styles/svg-styles";
import { masterDetail } from "../styles/master-detail";

@customElement('flathings-index')
export default class FlathingsIndex extends LitElement {
    @property({ type: Number }) thingId?: number

    constructor() {
        super()
        document.title = "租约之房"
    }
    
    protected render(): unknown {
        return html`
            <h2>租约之房</h2>
            <div class="container">
                <flathings-view .className=${this.thingId ? "master" : "drawer"}></flathings-view>
                ${this.thingId ? html`<flathing-view .thingId=${this.thingId} class="detail"></flathing-view>`
                    : html`<div class="detail">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" weight="24" height="24" class="large-svg">
                            <path stroke-linecap="round" stroke-linejoin="round" 
                                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                        </svg>
                    </div>`}
            </div>
            <navigo-a href="/flats/edit" title="新建租约之房" .styles=${{ margin: '0.3rem' }}>
                <span>新建</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </navigo-a>
        `
    }

    static styles = [
        smallSvg,
        largeSvg,
        masterDetail,
        css`
        `
    ]

}