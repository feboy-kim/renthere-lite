import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('home-page')
export default class HomePage extends LitElement {
    protected render(): unknown {
        return html`
            <div>Home Page</div>
        `
    }

    static styles = [
        css``
      ]
    

}