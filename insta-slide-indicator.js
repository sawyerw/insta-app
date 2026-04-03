import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class InstaSlideIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-slide-indicator";
  }

  constructor() {
    super();
    this.total = 0;
    this.currentIndex = 0;
    this.images = [];
    this._thumbOffset = 0; // which group of 4 we're viewing
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
      images: { type: Array },
      _thumbOffset: { type: Number },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      .thumbnail-bar {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-1);
        justify-content: center;
        background-color: var(--ddd-theme-default-skyLight);
        border-radius: var(--ddd-radius-md);
      }

      .thumbs {
        display: flex;
        gap: var(--ddd-spacing-2);
      }

      .thumb {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;
        border: 3px solid transparent;
        transition: border-color 0.2s;
      }

      .thumb.active {
        border-color: var(--ddd-theme-default-skyBlue);
      }

      button {
        color: var(--ddd-theme-default-white);
        background-color: var(--ddd-theme-default-nittanyNavy);
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-circle);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        border: none;
      }

      button:hover {
        background-color: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-nittanyNavy);
      }

      button:disabled {
        opacity: 0.3;
        cursor: default;
      }
    `];
  }

  render() {
    const visible = this.images.slice(this._thumbOffset, this._thumbOffset + 4);

    return html`
      <div class="thumbnail-bar">
        <button
          ?disabled=${this._thumbOffset === 0}
          @click=${this._prevThumbs}
        >&lt;</button>

        <div class="thumbs">
          ${visible.map((src, i) => {
            const realIndex = this._thumbOffset + i;
            return html`
              <img
                class="thumb ${realIndex === this.currentIndex ? 'active' : ''}"
                src="${src}"
                data-index="${realIndex}"
                @click=${this._handleThumbClick}
                alt="slide ${realIndex + 1}"
              />
            `;
          })}
        </div>

        <button
          ?disabled=${this._thumbOffset + 4 >= this.total}
          @click=${this._nextThumbs}
        >&gt;</button>
      </div>
    `;
  }

  _handleThumbClick(e) {
    const idx = Number(e.currentTarget.dataset.index);
    this.dispatchEvent(new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: { index: idx },
    }));
  }

  _prevThumbs() {
    if (this._thumbOffset > 0) {
      this._thumbOffset = Math.max(0, this._thumbOffset - 4);
    }
  }

  _nextThumbs() {
    if (this._thumbOffset + 4 < this.total) {
      this._thumbOffset = Math.min(this.total - 4, this._thumbOffset + 4);
    }
  }
}

globalThis.customElements.define("insta-slide-indicator", InstaSlideIndicator);