import { autoPlacement, computePosition, offset, shift } from "@floating-ui/dom";
import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { smallSvg } from "../styles/svg-styles";

@customElement('my-popover')
export default class MyPopover extends LitElement {
    @property({ type: String }) current!: string

    @query("div") private _popper: HTMLDivElement | undefined
    @query("button") private _button: HTMLElement | undefined
    @query("article") private _article: HTMLElement | undefined

    @state() private _popped = false

    private _show() {
        const b = this._button as HTMLElement
        const t = this._article as HTMLElement
        t.style.display = "block"
        computePosition(b, t, { middleware: [offset(8), autoPlacement(), shift({ padding: 0 })] })
            .then(({ x, y }) => {
                Object.assign(t.style, { left: `${x}px`, top: `${y}px` })
            })
        this._popped = true;
    }

    private _hide() {
        const t = this._article as HTMLElement
        t.style.display = ""
        this._popped = false;
    }

    private _handleMouseUp = (me: MouseEvent) => {
        if (!this._popper?.contains(me.target as HTMLElement)) {
            this._hide()
        }
    }
    private _handleKeyDown = (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') {
            this._hide()
        }
    }

    connectedCallback(): void {
        super.connectedCallback()
        window.addEventListener("mouseup", this._handleMouseUp)
        window.addEventListener("keydown", this._handleKeyDown)
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        window.removeEventListener("mouseup", this._handleMouseUp)
        window.removeEventListener("keydown", this._handleKeyDown)
    }

    protected render(): unknown {
        return html`
            <div>
                <button @click=${() => { this._show() }}>
                   ${this.current}${this._popped
                    ? html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>`
                    : html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="small-svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>`}
                </button>
                <article>
                    <section><slot></slot></section>
                </article>
            </div>
        `
    }
    static styles = [
        smallSvg,
        css`
            button {
                font-size: inherit;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                gap: 4px;
                padding: 0.2rem 0.5rem;
            }
            article {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
            }
            article > section {
                margin: 0.2rem 0.5rem;
                color: darkslategray;
                background-color: lightgray;
                border-radius: 4px;
            }
            @media (prefers-color-scheme: light) {
                article > section {
                    color: lightgray;
                    background-color: darkslategray;
                }
            }
        `
    ]

}