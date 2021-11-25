<template>
  <header class="header" :class="{ active: menu }">
    <div class="header__container container">
      <a href="https://innoweek.uz/" class="header__logo">
        <img src="@/assets/images/logo.png" alt />
      </a>

      <div class="header__content">
        <ul class="header__language">
          <li v-for="lang in languages" :key="lang.val">
            <a
              href="#"
              :class="{ active: lang.val == curLang }"
              @click.prevent="changeLanguage(lang)"
              >{{ lang.text }}</a
            >
          </li>
        </ul>

        <hr />
        <a href="#" @click.prevent="menuHandler" class="header__btn">
          <span class="material-icons">{{ menu ? "close" : "menu" }}</span>
        </a>

        <nav class="header__nav" :class="{ container: menu }">
          <a
            v-for="(item, idx) in api.nav"
            :key="item.link"
            :href="item.link"
            class="header__nav-link"
            @click="rmFixed($event, idx)"
          >
            {{ item.title }}
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { header } from "@/static/navigation";
export default {
  data() {
    return {
      languages: [
        {
          text: "O'zb",
          val: "uz"
        },
        {
          text: "Рус",
          val: "ru"
        },
        {
          text: "Eng",
          val: "en"
        }
      ],
      menu: false
    };
  },
  computed: {
    curLang() {
      return this.$store.state.curLang;
    },
    api() {
      return header[this.curLang];
    }
  },
  methods: {
    menuHandler() {
      this.menu = !this.menu;
      let app = document.querySelector("#app");
      app.classList.toggle("mobile__menu");
    },
    rmFixed($event, id) {
      let app = document.querySelector("#app");
      app.classList.remove("mobile__menu");
      this.menu = false;
      if (id + 1 == this.api.nav.length) {
        $event.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
      }
    },
    changeLanguage(lang) {
      this.$store.commit("setLang", lang.val);
      localStorage.setItem("language", lang.val);
    }
  }
};
</script>
