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
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
      images: { type: Array },
    };
  }

  // Whenever currentIndex changes, scroll the active thumb into view
  updated(changedProps) {
    if (changedProps.has("currentIndex")) {
      const active = this.shadowRoot.querySelector(".thumb.active");
      if (active) {
        active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      .thumbnail-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-1);
        padding: var(--ddd-spacing-1);
        background-color: var(--ddd-theme-default-skyLight);
        border-radius: var(--ddd-radius-md);
      }

      .thumbs {
        display: flex;
        gap: var(--ddd-spacing-2);
        overflow-x: auto;
        scroll-behavior: smooth;
        width: 100%;
        padding-bottom: var(--ddd-spacing-1);

        /* Show scrollbar on all browsers */
        scrollbar-width: thin;
        scrollbar-color: var(--ddd-theme-default-nittanyNavy) transparent;
      }

      /* horizontal scrollbar */
      .thumbs::-webkit-scrollbar {
        height: 5px;
      }
      .thumbs::-webkit-scrollbar-track {
        background: transparent;
      }
      .thumbs::-webkit-scrollbar-thumb {
        background-color: var(--ddd-theme-default-nittanyNavy);
        border-radius: var(--ddd-radius-md);
      }

      .thumb {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: var(--ddd-radius-sm);
        cursor: pointer;
        border: 3px solid transparent;
        transition: border-color 0.2s;
        flex-shrink: 0; /* Prevents thumbnails from squishing */
      }

      .thumb.active {
        border-color: var(--ddd-theme-default-skyBlue);
      }
    `];
  }

  render() {
    return html`
      <div class="thumbnail-bar">
        <div class="thumbs">
          ${this.images.map((src, i) => html`
            <img
            loading="lazy"
            width="50"
            height="50"
            
              class="thumb ${i === this.currentIndex ? 'active' : ''}"
              src="${src}"
              data-index="${i}"
              @click=${this._handleThumbClick}
              alt="slide ${i + 1}"
            />
          `)}
        </div>
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
}

globalThis.customElements.define("insta-slide-indicator", InstaSlideIndicator);