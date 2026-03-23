import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class InstaSlide extends DDDSuper((LitElement)) {

  static get tag() {
    return "insta-slide";
  }

  static get properties() {
    return {
      instaCaption: { type: String, attribute: "insta-caption" },
      instaChannel: { type: String, attribute: "insta-channel" },
      instaUsername: { type: String, attribute: "insta-username" }
    };
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .slide {
        width: 350px;
        height: 500px;
        padding: 20px;
        margin: 10px 0;
        background: var(--ddd-theme-default-slateLight);
      }

      .insta-caption {
        font-size: 18px;
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-default-skyBlue);
        margin: var(--ddd-spacing-small) 0;
      }

      .insta-channel {
        font-size: 50px;
        margin: var(--ddd-spacing-small) 0;
        color: gray;
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-default-nittanyNavy);
      }

      .insta-username {
        font-size: 18px;
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-default-skyBlue);
        margin: var(--ddd-spacing-small) 0;
      }

      .comment-box {
        margin: var(--ddd-spacing-small) 0;
        font-size: 16px;
        color: var(--ddd-theme-default-nittanyNavy);
        width: 300px;
        height: 75px;
        overflow-y: auto;
      }


    `;
  }

  render() {
    return html`
      <div class="slide">
        <h2 class="insta-channel">${this.instaChannel}</h2>
        <h3 class="insta-username">${this.instaUsername}</h3>
        <h1 class="insta-caption">${this.instaCaption}</h1>
        <div class="comment-box">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(InstaSlide.tag, InstaSlide);