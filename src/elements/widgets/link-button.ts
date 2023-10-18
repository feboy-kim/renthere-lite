import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { router } from "../../app-helper";
import { styleMap } from "lit/directives/style-map.js";

@customElement('link-button')
export default class LinkButton extends LitElement {
    @property({type: String}) href!: string
    @property({ type: Object }) styles = {}

    protected render(): unknown {
        return html`
            <button type="button" style=${styleMap(this.styles)} @click=${this._onClick}>
                <slot></slot>
            </button>
        `
    }

    private _onClick(_: Event) {
        router.navigate(this.href, { historyAPIMethod: 'replaceState' })
    }

    static styles = [
        css`
            button {
                padding: .4rem .8rem;
                font-size: initial;
                cursor: pointer;
            }
        `
    ]

}