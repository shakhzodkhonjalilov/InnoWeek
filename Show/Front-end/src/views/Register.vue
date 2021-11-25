<template>
  <div class="main">
    <h1>{{ api.title }}</h1>
    <v-form class="main__form" ref="form">
      <v-text-field
        v-model="firstName"
        :label="api.firstName"
        outlined
        :rules="reqRules"
        required
      />

      <v-text-field
        v-model="lastName"
        :label="api.lastName"
        outlined
        :rules="reqRules"
        required
      />

      <v-select
        v-model="gender"
        :items="api.sex.items"
        item-text="label"
        item-value="val"
        :label="api.sex.label"
        outlined
        :rules="reqRules"
        required
      />
      <v-autocomplete
        v-model="country"
        :items="api.countries"
        item-text="text"
        item-value="val"
        :label="api.country"
        outlined
        :rules="reqRules"
        required
      />
      <v-select
        v-model="born"
        :items="years"
        :label="api.born"
        outlined
        :rules="reqRules"
        required
      />

      <v-select
        :items="api.userType"
        :label="api.userTypeTitle"
        outlined
        :rules="reqRules"
        required
      />

      <v-text-field
        v-model="email"
        :label="api.email"
        outlined
        :rules="emailRules"
        required
      />

      <v-text-field
        :type="show ? 'text' : 'password'"
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :label="api.password"
        outlined
        @click:append="show = !show"
        :rules="reqRules"
        required
      />

      <div class="main__lang">{{ curLang.text }}</div>

      <v-checkbox
        v-model="terms"
        class="checkbox"
        hide-details
        :rules="reqRules"
        required
      >
        <template v-slot:label>
          <a
            target="_blank"
            href="https://innoweek.uz/terms"
            @click.stop
            v-html="api.terms"
            class="terms"
          >
          </a>
        </template>
      </v-checkbox>

      <v-checkbox v-model="mailing" class="checkbox mb-6" hide-details>
        <template v-slot:label>
          <div>{{ api.mailing }}</div>
        </template>
      </v-checkbox>

      <button class="btn" @click.prevent="register">{{ api.reg }}</button>
    </v-form>
    <div class="mt-4">
      {{ api.text }}
      <router-link to="/">{{ api.log }}</router-link>
    </div>

    <div class="mt-3">
      <a href="#" @click.prevent="supportHandler">{{ api.support.title }}</a>
    </div>

    <v-snackbar v-model="error" timeout="10000" centered color="pink lighten-1">
      {{ errorText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">{{
          api.close
        }}</v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="support" max-width="400">
      <div class="support">
        <div>
          {{ api.support.number }} <br />
          <a href="tel:+998939921815">+998 93 992 18 15</a>
        </div>

        <div class="support__chat">
          <a
            href="https://api.whatsapp.com/send?phone=998939921815"
            target="_blank"
          >
            {{ api.support.whatsapp }}
          </a>
          <br />
          <a href="https://t.me/Evgeniy_Sorochin" target="_blank">
            {{ api.support.telegram }}
          </a>
        </div>

        <div>
          {{ api.support.mail }} <br />
          <a href="mailto:jenya.sea@gmail.com">jenya.sea@gmail.com</a>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Register from "@/static/register";
import helper from "@/mixins/helper";

export default {
  name: "Register",
  mixins: [helper],
  data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      country: "",
      born: "",
      email: "",
      password: "",
      show: false,
      terms: true,
      mailing: true
    };
  },
  computed: {
    years() {
      let start = 1940;
      let end = 2016;
      let res = [];
      while (start < end) {
        res.push(start);
        start++;
      }
      return res.reverse();
    },
    api() {
      return Register[this.curLang.name];
    }
  },
  methods: {
    async register() {
      let validate = this.$refs.form.validate();
      if (!validate) return false;

      const body = {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        country: this.country,
        born: this.born.toString(),
        email: this.email.toLowerCase(),
        password: this.password,
        language: this.curLang.name,
        mailing: this.mailing
      };
      try {
        const res = await this.$axios.post("/api/auth/register", body, {
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.data;
        sessionStorage.setItem("token", data.token);
        location.href = `/${data.lang}`;
      } catch (err) {
        let error = err.response.data;
        this.errorText = error.message || error.errors[0].msg;
        this.error = true;
      }
    },
    termsHandler() {
      console.log("click");
      location.href = "https://innoweek.uz/terms";
    }
  },
  mounted() {
    // this.$refs.form.reset();
    sessionStorage.removeItem("token");
  }
};
</script>
