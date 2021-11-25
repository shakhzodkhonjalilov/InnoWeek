<template>
  <div class="auth">
    <h1 class="text-center">Авторизация</h1>
    <div class="auth__form">
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field v-model="login" label="Логин" required :rules="rul" />
        <v-text-field
          v-model="password"
          type="password"
          label="Пароль"
          required
          :rules="rul"
        />
        <div class="text-center">
          <v-btn type="submit" color="primary">Войти</v-btn>
        </div>
      </v-form>

      <v-snackbar
        v-model="error"
        timeout="3000"
        centered
        color="pink lighten-1"
      >
        {{ errorText }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="error = false"
            >Закрыть</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      login: "",
      password: "",
      rul: [v => !!v || ""],
      error: false,
      errorText: ""
    };
  },
  methods: {
    async submit() {
      let invalid = this.$refs.form.validate();
      if (!invalid) return false;
      let data = {
        login: this.login,
        password: this.password
      };
      try {
        await this.$store.dispatch("login", data);
        await this.$router.push("/");
      } catch (e) {
        this.error = true;
        this.errorText = "Неверные данные";
      }
    }
  },
  mounted() {
    this.$refs.form.reset();
    localStorage.removeItem("token");
  }
};
</script>
