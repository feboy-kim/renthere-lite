import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { smallSvg } from "../styles/svg-styles"
import { linkStyles } from "../styles/link-styles"

@customElement('detail-link')
export class DetailLink extends LitElement {
    @property({ type: String }) href!: string

    protected render(): unknown {
        return html`
            <a href=${this.href} class="rounded-flex" data-navigo>
                <span>协议</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </a>
        `
    }

    static styles = [
        smallSvg,
        linkStyles,
    ]

}

@customElement('pdfile-link')
export class PdfileLink extends LitElement {
    @property({ type: String }) href!: string

    protected render(): unknown {
        return html`
            <a href=${this.href} class="rounded-flex">
                <span>PDF</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </a>
        `
    }

    static styles = [
        smallSvg,
        linkStyles,
    ]

}
