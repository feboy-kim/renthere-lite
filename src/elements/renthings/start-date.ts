import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const dm = 24 * 36e5    // milliseconds per day

const getSundays = (d: Date): Date[] => {
    const ds: Date[] = []
    let first = new Date(d.valueOf() - (d.getDay() + 7) * dm)
    ds.push(first)
    while (ds.length < 4) {
        first = new Date(first.valueOf() + 7 * dm)
        ds.push(first)
    }
    return ds
}
const weekTags = ["日", "一", "二", "三", "四", "五", "六"]

@customElement('start-date')
export default class StartDate extends LitElement {
    @property({ type: String }) label!: string
    @property({ type: Object }) value!: Date

    private _itemSpan(d: Date) {
        return html`<span .className=${d.getDate() === this.value.getDate() ? "selected" : ""} @click=${() => this._onSelect(d)}>
            ${d.getDate()}
        </span>`
    }

    protected render(): unknown {
        const current = Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(this.value)
        const sundays = getSundays(this.value)
        return html`
            <fieldset>
                <legend><small>${this.label}</small></legend>
                <my-popover .current=${current}>
                    <div style="padding: 0.8rem;">
                        <p class="week-days" style="opacity: 0.75;">
                            ${weekTags.map(d => html`<span>${d}</span>`)}
                        </p>
                        <p style="opacity: 0.75; text-align: center;">
                            ${Intl.DateTimeFormat("zh-CN", { year: 'numeric', month: '2-digit' }).format(this.value)}
                        </p>
                        ${sundays.map(d => html`<p class="week-days">
                            ${weekTags.map((_, i) => this._itemSpan(new Date(d.valueOf() + i * dm)))}
                        </p>`)}
                    </div>
                </my-popover>
            </fieldset>
        `
    }

    private _onSelect(d: Date) {
        this.dispatchEvent(new CustomEvent('date-selected', { detail: { d }, bubbles: true, composed: false }))
    }

    static styles = [
        css`
            legend small {
                opacity: 0.75;
            }
            p.week-days, p.month {
                margin: 0.2rem;
                padding: 0.2rem 0.5rem;
            }
            p.week-days span {
                display: inline-block;
                width: 1.2rem;
                text-align: center;
                margin: 0.2rem 0.3rem;
                padding: 0.2rem 0.3rem;
                cursor: default;
                border-radius: 4px;
            }
            span.selected {
                border: 2px solid cornflowerblue;
            }
            span:hover {
                background-color: cornflowerblue;
            }
        `
    ]

}