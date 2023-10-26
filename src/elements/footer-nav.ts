import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { linkStyles } from "./styles/link-styles";

@customElement('footer-nav')
export default class FooterNav extends LitElement {
    @property({ type: String }) footing?: string

    protected render(): unknown {
        return html`<nav>
          <a href="/" data-navigo>
            <svg xmlns="http://www.w3.org/2000/svg" role="img" width="24" height="24" viewBox="-12 -12 24 24" fill="none" stroke="violet">
              <defs><clipPath id="cp">
                <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" />
              </clipPath></defs>
              <ellipse cx="0" cy="2" rx="12" ry="8" fill="transparent" stroke-width="4" stroke="violet" 
                clip-path="url(#cp)" transform="translate(0,-2)" />
            </svg>
          </a>
          <span>${new Date().getFullYear()} &nbsp; Renthere</span>
      </nav>`
    }

    static styles = [
        linkStyles,
        css`
            nav {
                display: inline-flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: 0.2rem 0.5rem;
                gap: 4px;
            }
        `
    ]

}