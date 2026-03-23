/**
 * Copyright 2026 sawyerw
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-slide.js";
import "./insta-slide-arrow.js";
import "./insta-slide-indicator.js";

/**
 * `insta-app`
 * 
 * @demo index.html
 * @element insta-app
 */
export class InstaApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    // start at the first slide unless index attribute is provided
    this.index = 0;
    // slideCount will be computed based on slotted slides
    this.slideCount = 0;
    // wrap behavior on by default
    this.wrap = true;
    // prev code
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    index: { type: Number }, // added index for current slide
      slideCount: { type: Number } // added slideCount to track total slides, fix dots to load
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        position: relative;
      }
      h3 span {
        font-size: var(--play-list-project-label-font-size, var(--ddd-font-size-s));
      }

    ::slotted(insta-slide) {
      display: block;
    }


    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
      <slide-arrow
    @prev-clicked="${this.prev}" 
    @next-clicked="${this.next}">
  </slide-arrow>
      <slot></slot>
      <slide-indicator
        @play-list-index-changed=${this._handleIndexChange}
        .total=${this.slideCount}
        .currentIndex=${this.index}
      ></slide-indicator>
    </div>
  `;
  }

  // added to figure out slide index
  firstUpdated() {
  this.slides = Array.from(this.querySelectorAll("play-list-slide"));
  this.slideCount = this.slides.length;
  this.index = 0; // start at the first slide
  this._updateSlides();
}

// actually update slides based on index
_updateSlides() {
  this.slides.forEach((slide, i) => {
    slide.style.display = i === this.index ? "block" : "none";
  });
}

next() {
  if (this.index < this.slideCount - 1) {
    this.index++;
    this._updateSlides();
  }
}

prev() {
  if (this.index > 0) {
    this.index--;
    this._updateSlides();
  }
}

_handleIndexChange(e) {
  this.index = e.detail.index;
  this._updateSlides();
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstaApp.tag, InstaApp);