import { LitElement, css, html, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './elements/header-nav'
import './elements/flathings/flat-index'
import './elements/renthings/rent-index'
import './elements/flathings/thing-edit'
import './elements/renthings/thing-edit'
import './elements/not-found'
import './elements/flathings/flat-deleter'
import './elements/renthings/rent-deleter'
import './elements/home-page'
import './elements/leases/lease-view'
import { router } from './app-helper'
import { therenv } from './there-env'

@customElement('app-element')
export class AppElement extends LitElement {
  @state() private _mainChild = html``
  @state() private _yearShown = true
  @state() private _heading = ""

  constructor() {
    super()
    router.on({
      '/': () => {
        this._yearShown = true
        this._heading = therenv.appName
        this._mainChild = html`<home-page></home-page>`
      },
      '/lease/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = true
        this._heading = "协议"
        this._mainChild = html`<lease-view .thingId=${data.id}></lease-view>`
      },

      // 租约之房 routes
      '/flats/view': () => {
        this._yearShown = true
        this._heading = "租约之房"
        this._mainChild = html`<flathings-index .thingId=${0}></flathings-index>`
      },
      '/flats/view/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = false
        this._heading = "租约之房"
        this._mainChild = html`<flathings-index .thingId=${data.id}></flathings-index>`
      },
      '/flats/delete/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = true
        this._heading = "删除租约之房"
        this._mainChild = html`<flat-deleter .thingId=${data.id}></flat-deleter>`
      },
      '/flats/edit': () => {
        this._yearShown = true
        this._heading = "新建租约之房"
        this._mainChild = html`<flathing-edit></flathing-edit>`
      },
      '/flats/edit/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = true
        this._heading = "修改租约之房"
        this._mainChild = html`<flathing-edit .thingId=${data.id}></flathing-edit>`
      },

      // 租房之约 routes
      '/rents/view': () => {
        this._yearShown = true
        this._heading = "租房之约"
        this._mainChild = html`<renthings-index></renthings-index>`
      },
      '/rents/view/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = false
        this._heading = "租房之约"
        this._mainChild = html`<renthings-index .thingId=${data.id}></renthings-index>`
      },
      '/rents/delete/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = true
        this._heading = "删除租房之约"
        this._mainChild = html`<rent-deleter .thingId=${data.id}></rent-deleter>`
      },
      '/rents/edit': () => {
        this._yearShown = true
        this._heading = "新建租房之约"
        this._mainChild = html`<renthing-edit></renthing-edit>`
      },
      '/rents/edit/:id': ({ data }: { data: { id: number } }) => {
        this._yearShown = true
        this._heading = "修改租房之约"
        this._mainChild = html`<renthing-edit .thingId=${data.id}></renthing-edit>`
      },
    })
    router.notFound(() => {
      this._heading = ""
      this._mainChild = html`
        <not-found></not-found>
      `
    })
    router.resolve()
  }

  render() {
    return html`
      <header>
        <header-nav heading=${this._heading}></header-nav>
      </header>
      <main>${this._mainChild}</main>
      <footer>
        ${this._yearShown ? html`
            <span>&copy;&nbsp;${new Date().getFullYear()} &nbsp; Renthere</span>
        ` : nothing}
      </footer>
    `
  }

  static styles = css`
    :host {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      min-height: 100vh;
    }
    main {
      max-width: 1280px;
      margin: 0 auto;
      width: 100%;
      z-index: 10;
    }
    header {
      background-color: #4169e13F;
    }
    footer {
      background-color: #4169e12F;
      opacity: 0.7;
    }
    footer > span {
      display: block;
      padding: 0.8rem;
    }
    header, footer {
      flex: none;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement
  }
}
