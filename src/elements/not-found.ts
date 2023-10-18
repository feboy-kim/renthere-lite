import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('not-found')
export default class NotFound extends LitElement {
    protected render(): unknown {
        return html`
            <p>路径错误，迷路了！</p>
        `
    }
}