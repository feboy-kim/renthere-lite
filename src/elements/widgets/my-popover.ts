import { autoPlacement, computePosition, offset, shift } from "@floating-ui/dom";
import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement('my-popover')
export default class MyPopover extends LitElement {
    @property({ type: String }) label!: string

    @query("div")
    _popper: HTMLDivElement | undefined

    @query("button")
    _button: HTMLElement | undefined

    @query("article")
    _article: HTMLElement | undefined

    @state() _popped = false

    private _show() {
        const b = this._button as HTMLElement
        const t = this._article as HTMLElement
        t.style.display = "block"
        computePosition(b, t, { middleware: [offset(8), autoPlacement(), shift({ padding: 0 })] })
            .then(({ x, y }) => {
                Object.assign(t.style, { left: `${x}px`, top: `${y}px` })
            })
    }

    private _hide() {
        const t = this._article as HTMLElement
        t.style.display = ""
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
                <button @click=${() => { this._show() }} @focus=${() => this._show()}>
                    ${this.label}
                </button>
                <article>
                    <section><slot></slot></section>
                </article>
            </div>
        `
    }
    static styles = [
        css`
            button {
                padding: 0.4rem 0.6rem;
            }
            article {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
            }
            article > section {
                margin: 0.2rem 0.6rem;
                background-color: darkslategray;
                border-radius: 4px;
            }
            @media (prefers-color-scheme: light) {
                article > section {
                    color: lightgray;
                }
            }
        `
    ]

}