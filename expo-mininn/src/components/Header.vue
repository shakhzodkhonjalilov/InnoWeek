<template>
  <header class="header">
    <v-container size="lg">
      <div class="header__content">
        <a href="http://innoweek.uz" class="header__logo">
          <img src="@/assets/images/logo.png" alt="logo" />
        </a>
        <div>
          <ul class="header__lang">
            <li v-for="lang in languages" :key="lang.name">
              <a
                href="#"
                class="header__link"
                :class="{ active: lang.name == curLang }"
                @click.prevent="changeLang(lang.name)"
              >{{ lang.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </v-container>
  </header>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        { name: "uz", title: "O'zb" },
        { name: "ru", title: "Рус" },
        { name: "en", title: "Eng" },
      ],
    };
  },
  computed: {
    curLang() {
      return this.$store.getters.lang;
    },
  },
  methods: {
    changeLang(lang) {
      this.$store.dispatch("changeLang", lang);
      localStorage.setItem("curLocation", lang);
    },
  },
};
</script>
