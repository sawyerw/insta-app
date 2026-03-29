import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./insta-slide-indicator.js";

export class InstaSlide extends DDDSuper((LitElement)) {

  static get tag() {
    return "insta-slide";
  }

  static get properties() {
  return {
    instaCaption: { type: String, attribute: "insta-caption" },
      instaChannel: { type: String, attribute: "insta-channel" },
      instaUsername: { type: String, attribute: "insta-username" },
      profilePic:    { type: String },
      userSince:     { type: String },
      thumbnail:     { type: String },
      dateTaken:     { type: String },
      elementVisible: { type: Boolean },
      liked: { type: Boolean },
      images: { type: Array },
      currentIndex: { type: Number }
  };
}

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  constructor() {
  super();
  this.liked = false; 
  this.images = [];
  this.currentIndex = 0;
}

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .slide {
        width: 350px;
        height: 650px;
        padding: 20px;
        margin: 10px 0;
        background: var(--ddd-theme-default-white);
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      .profile-pic {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }

      .header-text {
        display: flex;
        flex-direction: column;
      }

      .insta-channel {
        font-size: 30px;
        font-weight: bold;
        color: var(--ddd-theme-default-nittanyNavy);
        margin: 0;
      }

      .insta-username {
        font-size: 18px;
        color: var(--ddd-theme-default-skyBlue);
        margin: 0;
      }

      .user-since {
        font-size: 12px;
        color: var(--ddd-theme-default-limestoneGray);
        margin: 0;
      }

      .post-photo {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: 8px;
        margin: 10px 0;
      }

      .insta-caption {
        font-size: 18px;
        color: var(--ddd-theme-default-nittanyNavy);
        margin: 6px 0;
      }

      .date-taken {
        font-size: 12px;
        color: var(--ddd-theme-default-limestoneGray);
        margin: 4px 0;
      }

      .like-btn {
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        padding: 4px;
        margin-left: 300px;
        margin-top: -20px;
      }


    `;
  }


render() {
  return html`
    <div class="slide">

      <div class="header">
        <img class="profile-pic" src="${this.profilePic}" alt="${this.instaChannel}" />
        <div class="header-text">
          <span class="insta-channel">${this.instaChannel}</span>
          <span class="insta-username">${this.instaUsername}</span>
          <span class="user-since">Member since ${this.userSince}</span>
        </div>
      </div>

      <img
        class="post-photo"
        src="${this.elementVisible ? this.thumbnail : ''}"
        alt="post photo"
      />

      <insta-slide-indicator
        .total=${this.images.length}
        .currentIndex=${this.currentIndex}
        .images=${this.images}
      ></insta-slide-indicator>

      <

      <button class="like-btn" @click=${() => this.dispatchEvent(
            new CustomEvent('toggle-like', { bubbles: true, composed: true })
          )}>
            ${this.liked ? "❤️" : "🤍"}
      </button>

      <p class="insta-caption">${this.instaCaption}</p>
      <p class="date-taken">📅 ${this.dateTaken}</p>


    </div>
  `;
}
}

globalThis.customElements.define(InstaSlide.tag, InstaSlide);