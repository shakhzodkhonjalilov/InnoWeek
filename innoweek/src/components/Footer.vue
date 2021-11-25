<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="footer__title">{{ api.section }}</div>
          <ul class="footer__nav">
            <li v-for="item in api.nav" :key="item.title">
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </div>

        <div class="col-md-8">
          <div class="footer__title">{{ api.department }}</div>
          <div class="row">
            <div
              class="col-lg-4"
              v-for="(info, idx) in api.informations"
              :key="idx"
            >
              <div class="footer__contacts">
                <p>{{ info.name }}</p>
                <div v-for="contact in info.contact" :key="contact.link">
                  <a :href="contact.link">{{ contact.text }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4">
          <a href="/" class="footer__logo">
            <img src="@/assets/images/logo-2.png" alt />
          </a>
        </div>
        <div class="col-xl-8">
          <div class="footer__mailing">
            <div class="footer__mailing-title" v-html="api.mailing.text"></div>
            <input
              v-if="!mailing"
              type="text"
              v-model="email"
              placeholder="Email"
              ref="email"
              @input="rmError"
            />
            <div v-else class="text-success">{{ api.mailing.success }}</div>
            <button class="btn" @click="subscribeHandler">
              {{ api.mailing.btn }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="footer__bottom">
      <p>Copyright © Innoweek 2020</p>
    </div> -->
  </footer>
</template>

<script>
import { footer } from "@/static/navigation";
export default {
  data() {
    return {
      email: "",
      mailing: false
    };
  },
  computed: {
    api() {
      const lang = this.$store.state.curLang;
      return footer[lang];
    }
  },
  methods: {
    async subscribeHandler() {
      if (!/.+@.+\..+/.test(this.email)) {
        this.$refs.email.classList.add("error");
        return false;
      }

      try {
        await this.$axios.post("https://show.innoweek.uz/api/subscribe", {
          email: this.email,
          language: this.$store.state.curLang
        });
        this.mailing = true;
      } catch (e) {
        this.mailing = true;
      }
      setTimeout(() => {
        this.mailing = false;
        this.email = "";
      }, 3000);
    },
    rmError() {
      this.$refs.email.classList.remove("error");
    }
  }
};
</script>
