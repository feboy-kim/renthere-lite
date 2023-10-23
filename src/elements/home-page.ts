import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { therenv } from "../there-env";
import { masterDetail } from "./styles/master-detail";
import { Task } from "@lit/task/task.js";
import { flathingCount, renthingCount } from "../dex/db-reader";
import { linkStyles } from "./styles/link-styles";

@customElement('home-page')
export default class HomePage extends LitElement {

    constructor() {
        super()
        document.title = therenv.appName
    }

    private _task = new Task(this, {
        task: async () => ({
            flatCount: await flathingCount(),
            rentCount: await renthingCount()
        }),
        args: () => []
    })

    protected render(): unknown {
        return this._task.render({
            pending: () => html`<p>Loading ...</p>`,
            complete: (countwin) => html`
            <div class="master-detail">
                <div class="master">
                    ${countwin.flatCount > 0
                    ? html`<p>已有房屋数据: <a href="/flats/view" title="租约之房" data-navigo>
                            <span>${countwin.flatCount}</span>
                        </a></p>`
                    : html`<p>没有房屋数据: <a href="/flats/edit" title="租约之房" data-navigo>\u271A</a></p>`
                }
                    ${countwin.rentCount > 0
                    ? html`<p>已有租约数据: <a href="/rents/view" title="租房之约" data-navigo>
                            <span>${countwin.rentCount}</span>
                        </a></p>`
                    : html`<p>没有租约数据: <a href="/rents/edit" title="租房之约" data-navigo>\u271A</a></p>`
                }
                </div>
                <div class="detail-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" width="24" height="24" viewBox="-12 -12 24 24">
                        <defs>
                            <clipPath id="cp">
                                <rect x="-10" y="-10" width="20" height="20" transform="rotate(45)" />
                            </clipPath>
                        </defs>
                        <ellipse cx="0" cy="2" rx="12" ry="8" fill="transparent" stroke-width="4" stroke="violet" clip-path="url(#cp)" transform="translate(0,-2)" />
                    </svg>
                </div>            
            </div>
        `,
            error: (e) => html`<p>Error: ${e}</p>`
        })
    }

    static styles = [
        masterDetail,
        linkStyles,
        css`
            div.master {
                margin: 0.2rem;
            }
            p {
                margin: 0.2rem;
                padding: 0.2rem 0.4rem;
            }
            a > span {
                font-weight: 700;
            }
            div.detail-svg {
                display: flex;
                justify-content: center;
            }
            svg {
                opacity: 0.5;
                display: none;
                transform: scale(2);
            }
            @media(min-width: 640px) {
                svg {
                    display: inline-block;
                    transform: scale(4);
                }
            }
            @media(min-width: 960px) {
                svg {
                    transform: scale(6);
                }
            }
        `
    ]


}