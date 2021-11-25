<template>
  <div class="auth">
    <h1 class="text-center">Авторизация</h1>
    <v-form ref="form" class="auth__form">
      <v-text-field v-model="login" label="Логин" />
      <v-text-field v-model="password" type="password" label="Пароль" />

      <v-btn class="mr-4" color="primary" @click="auth">Войти</v-btn>

      <v-snackbar
        v-model="error"
        timeout="10000"
        centered
        color="pink lighten-1"
      >
        Неправильные данные
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="error = false"
            >Закрыть</v-btn
          >
        </template>
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
      error: false
    };
  },
  methods: {
    async auth() {
      if (!this.login || !this.password) return false;

      let data = {
        login: this.login,
        password: this.password
      };
      try {
        let auth = await this.$axios.post("auth", data);
        let token = auth.data.token;
        if (token) {
          sessionStorage.setItem("token", token);
          this.$router.push("/");
        } else {
          this.error = true;
        }
      } catch (error) {
        this.error = true;
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.auth__form {
  max-width: 500px;
  width: 100%;
  margin: 30px auto 0;
  padding: 30px;
  background: rgba(#eeeeee, 0.5);
  text-align: center;
  border-radius: 10px;
}
</style>
