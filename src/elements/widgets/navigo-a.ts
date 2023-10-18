import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { linkStyles } from "../my-styles";

@customElement('navigo-a')
export class NavigoA extends LitElement {
    @property({ type: String }) href: string = ""
    @property({ type: Object }) styles = {}

    protected render(): unknown {
        return html`
            <a href=${this.href} style=${styleMap(this.styles)} data-navigo>
                <slot></slot>
            </a>    
        `
    }

    static styles = [
        linkStyles,
        css`
            a {
                display: inline-flex;
            }
            ::slotted(*) {
                flex: none;   
            }
        `
    ]
}