import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './elements/header-nav'
import './elements/the-footer'
import './elements/flathings/flat-index'
import './elements/renthings/rent-index'
import './elements/flathings/thing-edit'
import './elements/renthings/thing-edit'
import './elements/not-found'
import './elements/flathings/flat-deleter'
import './elements/renthings/rent-deleter'
import './elements/home-page'
import { router } from './app-helper'

@customElement('app-element')
export class AppElement extends LitElement {
  @state() private _page = html``

  constructor() {
    super()
    router.on({
      '/': () => {
        this._page = html`<home-page></home-page>`
      },

      // 租约之房 routes
      '/flats/view': () => {
        this._page = html`<flathings-index .thingId=${0}></flathings-index>`
      },
      '/flats/view/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<flathings-index .thingId=${data.id}></flathings-index>`
      },
      '/flats/delete/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<flat-deleter .thingId=${data.id}></flat-deleter>`
      },
      '/flats/edit': () => {
        this._page = html`<flathing-edit></flathing-edit>`
      },
      '/flats/edit/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<flathing-edit .thingId=${data.id}></flathing-edit>`
      },

      // 租房之约 routes
      '/rents/view': () => {
        this._page = html`<renthings-index></renthings-index>`
      },
      '/rents/view/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<renthings-index .thingId=${data.id}></renthings-index>`
      },
      '/rents/delete/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<rent-deleter .thingId=${data.id}></rent-deleter>`
      },
      '/rents/edit': () => {
        this._page = html`<renthing-edit></renthing-edit>`
      },
      '/rents/edit/:id': ({ data }: { data: { id: number } }) => {
        this._page = html`<renthing-edit .thingId=${data.id}></renthing-edit>`
      },
    })
    router.notFound(() => {
      this._page = html`
        <not-found></not-found>
      `
    })
    router.resolve()
  }

  render() {
    return html`
      <header>
        <header-nav></header-nav>
      </header>
      <main>${this._page}</main>
      <footer>
        <p>
          ${new Date().getFullYear()} &nbsp; <span>Renthere</span>
        </p>
      </footer>
    `
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      min-height: 100vh;
    }
    header, footer {
      flex: none;
      margin: 0.4rem 0.8rem;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement
  }
}
