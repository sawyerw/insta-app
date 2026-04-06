
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class InstaSlideArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-slide-arrow";
  }

  constructor() {
    super();
    this.index = 0; 
    this.slideCount = 0;   
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      index: { type: Number },        
      slideCount: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        position: absolute;
        inset: var(--ddd-spacing-0);
        width: 100%;
        pointer-events: none;
      }
    
      button {
        color: var(--ddd-theme-default-nittanyNavy);
        background-color: var(--ddd-theme-default-skyLight);
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        border-radius: var(--ddd-radius-circle);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        pointer-events: auto;
      }
      button:hover {
        background-color: var(--ddd-theme-default-skyBlue);
        color: white;
      }
     .arrow-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 375px;
        margin-top: 300px;
        margin-left: var(--ddd-spacing-10);
     }

     @media (max-width: 480px) { // some mobile responsiveness
      .arrow-container {
        width: 100%;
        margin-left: 0;
        box-sizing: border-box;
        padding: 0 var(--ddd-spacing-3);
      }
    }
     
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="arrow-container">
        <button
          class="prev"
          aria-label="Previous post"
          ?disabled=${this.index === 0}
          @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', { bubbles: true, composed: true }))}
        >&lt;</button>

        <button
          class="next"
          aria-label="Next post"
          ?disabled=${this.index === this.slideCount - 1}
          @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', { bubbles: true, composed: true }))}
        >&gt;</button>
      </div>
    `;
  }

}

globalThis.customElements.define(InstaSlideArrow.tag, InstaSlideArrow);