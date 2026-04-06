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
        padding: var(--ddd-spacing-5);
        margin: 10px 0;
        background: light-dark(white, var(--ddd-theme-default-nittanyNavy));
        border-color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        border-width: var(--ddd-border-xs);
        border-radius: var(--ddd-radius-lg);
        border-style: solid;
      }

      @media (max-width: 480px) { // some mobile responsiveness
        .slide {
          width: 100%;
          height: auto;
          box-sizing: border-box;
        }
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-3);
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
        font-size: var(--ddd-font-size-3xs);
        font-weight: var(--ddd-font-weight-bold);
        color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        margin: 0;
      }

      .insta-username {
        font-size: var(--ddd-font-size-3xs);
        color: var(--ddd-theme-default-skyBlue);
        margin: 0;
      }

      .user-since {
        font-size: var(--ddd-font-size-4xs);
        color: var(--ddd-theme-default-limestoneGray);
        margin: 0;
      }

      .post-photo {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border-radius: var(--ddd-radius-md);
        margin: 10px 0;
      }

      .insta-caption {
        font-size: var(--ddd-font-size-3xs);
        color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        margin: 6px 0;
      }

      .date-taken {
        font-size: var(--ddd-font-size-4xs);
        color: var(--ddd-theme-default-limestoneGray);
        margin: 4px 0;
      }

      .like-btn {
        background: none;
        border: none;
        font-size: var(--ddd-font-size-s);
        cursor: pointer;
        padding: var(--ddd-spacing-1);
      }

      .action-row { // like and share buttons
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--ddd-spacing-2);
        width: 100%;
      }

      .share-btn {
        background: var(--ddd-theme-default-skyLight);
        border: var(--ddd-border-xs);
        border-color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        border-width: var(--ddd-border-xs);
        border-radius: var(--ddd-radius-sm);
        font-size: var(--ddd-font-size-4xs);
        padding: 4px 10px;
        cursor: pointer;
        color: var(--ddd-theme-default-nittanyNavy);
      }

      .share-btn:hover {
        background: var(--ddd-theme-default-skyBlue);
        color: white;
      }

      .share-toast {
        position: fixed;
        bottom: var(--ddd-spacing-5);
        background: light-dark(var(--ddd-theme-default-nittanyNavy), var(--ddd-theme-default-skyLight));
        color: light-dark(white, var(--ddd-theme-default-nittanyNavy));
        padding: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-lg);
        font-size: var(--ddd-font-size-4xs);
        opacity: 0;
        transition: opacity 0.3s;
      }

      .share-toast.visible {
        opacity: 1;
      }


    `;
  }

  _handleShare() {
  const url = location.origin + location.pathname + "#slide=" + this.currentIndex;
  navigator.clipboard.writeText(url).then(() => {
    const toast = this.shadowRoot.getElementById("toast");
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2000);
  });
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

      

      <div class="action-row">
  <button class="share-btn" aria-label="Share this post" @click=${this._handleShare}>share</button>
  <button class="like-btn" 
        aria-label=${this.liked ? "Unlike this post" : "Like this post"}
        @click=${() => this.dispatchEvent(
        new CustomEvent('toggle-like', { bubbles: true, composed: true })
      )}>
        ${this.liked ? "❤️" : "🤍"}
  </button>
</div>
<div class="share-toast" id="toast">Link copied!</div>

      <p class="insta-caption">${this.instaCaption}</p>
      <p class="date-taken">📅 ${this.dateTaken}</p>


    </div>
  `;
}
}

globalThis.customElements.define(InstaSlide.tag, InstaSlide);