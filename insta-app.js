import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-slide.js";
import "./insta-slide-arrow.js";
import "./insta-slide-indicator.js";


export class InstaApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-app";
  }

  constructor() {
    super();
    this.index = 0;
    this.slideCount = 0;
    this.data = [];
    this.title = "";
    this.t = this.t || {};
    this.t = { ...this.t, title: "Title" };
    this.likes = [];
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: { type: Number },
      slideCount: { type: Number },
      data: { type: Array },
      likes: { type: Array },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
    `];
  }

  render() {
  return html`
    <div class="wrapper" @play-list-index-changed=${this._onIndicatorChange}>
      <insta-slide-arrow
        .index=${this.index}
        .slideCount=${this.slideCount}
        @prev-clicked=${this.prev}
        @next-clicked=${this.next}
      ></insta-slide-arrow>

      ${this.data.map((item, i) => html`
        <insta-slide
          .elementVisible=${i === this.index}
          .liked=${this.likes[i] ?? false}
          @toggle-like=${() => this.toggleLike(i)}

          insta-channel="${item.author['insta-channel']}"
          insta-username="${item.author['insta-username']}"
          .profilePic="${item.author['profile-pic']}"
          .userSince="${item.author['user-since']}"
          .thumbnail="${item.image['post-photo']}"
          .dateTaken="${item.image['date-taken']}"
          insta-caption="${item.image['insta-caption']}"
          style="display: ${i === this.index ? 'block' : 'none'}"

          .images=${this.data.map(item => item.image['post-photo'])}
          .currentIndex=${this.index}
        ></insta-slide>
      `)}

    </div>
  `;
}

  async firstUpdated() {
    const res = await fetch("./data.json");
    const json = await res.json();
    this.data = json.data;
    this.slideCount = this.data.length;
    this.index = 0;

    // load likes from localStorage for each slide
  this.likes = this.data.map((_, i) => {
    return localStorage.getItem("liked_" + i) === "true";
  });
}

toggleLike(i) {
  // copy the array so Lit detects the change and re-renders
  const updated = [...this.likes];
  updated[i] = !updated[i];
  this.likes = updated;
  localStorage.setItem("liked_" + i, this.likes[i]);
}

  next() {
    if (this.index < this.slideCount - 1) {
      this.index++;
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
    }
  }

  _onIndicatorChange(e) {
  this.index = e.detail.index;
}

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }

}

globalThis.customElements.define(InstaApp.tag, InstaApp);