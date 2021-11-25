<template>
  <div>
    <div class="main">
      <v-form class="main__form" ref="form" v-if="!forgotPass">
        <h1>{{ api.title }}</h1>
        <v-text-field
          v-model="email"
          :label="api.email"
          outlined
          :rules="emailRules"
          required
        />
        <v-text-field
          type="password"
          v-model="password"
          :label="api.password"
          outlined
          :rules="reqRules"
          required
        />
        <div class="main__lang">{{ curLang.text }}</div>
        <button class="btn" @click.prevent="login">{{ api.login }}</button>

        <div class="mt-3">
          <a href="#" @click.prevent="forgotPass = true">{{ api.forgot }}</a>
        </div>
      </v-form>

      <v-form class="main__form" ref="recoveryForm" v-show="forgotPass">
        <h1>{{ api.forgotPage.title }}</h1>

        <v-text-field
          v-model="recovery"
          :label="api.email"
          outlined
          :rules="emailRules"
          required
          hide-details
        />
        <div class="forgot__text">
          {{ api.forgotPage.text }}
        </div>
        <button class="btn" @click.prevent="recoveryHandler">
          {{ api.forgotPage.btn }}
        </button>

        <v-snackbar
          v-model="forgotSnack"
          timeout="100000"
          centered
          color="success lighten-1"
        >
          {{ api.forgotPage.success }}
          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="forgotSuccess">{{
              api.close
            }}</v-btn>
          </template>
        </v-snackbar>
      </v-form>

      <div class="mt-3">
        {{ api.newUser }}
        <router-link to="/register">
          {{ api.reg }}
        </router-link>
      </div>

      <div class="mt-3">
        <a href="#" @click.prevent="supportHandler"> {{ api.support.title }}</a>
      </div>

      <v-snackbar
        v-model="error"
        timeout="10000"
        centered
        color="pink lighten-1"
      >
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
  </div>
</template>

<script>
import Login from "@/static/login";
import helper from "@/mixins/helper";

export default {
  name: "Login",
  mixins: [helper],
  data() {
    return {
      email: "",
      password: "",
      forgotPass: false,
      recovery: "",
      forgotSnack: false
    };
  },
  computed: {
    api() {
      return Login[this.curLang.name];
    }
  },
  methods: {
    async login() {
      let validate = this.$refs.form.validate();
      if (!validate) return false;
      const body = {
        email: this.email,
        password: this.password,
        language: this.curLang.name
      };

      try {
        const res = await this.$axios.post("/api/auth/login", body, {
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
    async recoveryHandler() {
      let validate = this.$refs.recoveryForm.validate();
      if (!validate) return false;
      const data = {
        email: this.recovery,
        language: this.curLang.name
      };
      try {
        await this.$axios.post("/api/auth/recovery", data, {
          headers: { "Content-Type": "application/json" }
        });
        this.forgotSnack = true;
        setTimeout(() => {
          this.forgotPass = false;
        }, 3000);
      } catch (error) {
        this.error = true;
        if (this.curLang.name == "ru") {
          this.errorText = "Данный пользователь не найден";
        } else if (this.curLang.name == "uz") {
          this.errorText = "Ushbu foydalanuvchi topilmadi";
        } else {
          this.errorText = "This user was not found";
        }
        this.recovery = "";
      }
    },
    forgotSuccess() {
      this.forgotSnack = false;
      this.forgotPass = false;
    }
  },
  mounted() {
    this.$refs.form.reset();
    sessionStorage.removeItem("token");
  }
};
</script>
