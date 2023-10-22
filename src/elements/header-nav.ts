import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { smallSvg } from "./styles/svg-styles";
import { linkStyles } from "./styles/link-styles";

@customElement('header-nav')
export default class HeaderNav extends LitElement {

  protected render(): unknown {
    return html`<nav>
        <a href="/" data-navigo class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" role="img" width="48" height="48" viewBox="-12 -12 24 24" fill="none" stroke="violet">
            <defs><clipPath id="cp">
              <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" />
            </clipPath></defs>
            <ellipse cx="0" cy="2" rx="12" ry="8" fill="transparent" stroke-width="4" stroke="violet" 
              clip-path="url(#cp)" transform="translate(0,-2)" />
          </svg>
        </a>
        <div>
          <a href="/flats/view" title="租约之房" style="display: inline-flex;" data-navigo>
            <span>房屋</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" weight="24" height="24" class="small-svg">
              <path stroke-linecap="round" stroke-linejoin="round" 
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
          </a>
          <a href="/rents/view" title="租房之约" style="display: inline-flex;" data-navigo>
            <span>租约</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  weight="24" height="24" class="small-svg">
              <path stroke-linecap="round" stroke-linejoin="round" 
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </a>
        </div>
      </nav>`
  }

  static styles = [
    smallSvg,
    linkStyles,
    css`
      nav {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      nav > div {
        margin-right: 0.5rem;
      }
      a.logo {
        padding: 0.2rem 0.6rem;
        margin: 0.2rem;
      }
    `
  ]

}