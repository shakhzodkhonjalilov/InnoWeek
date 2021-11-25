<template>
  <div class="home">
    <h1 class="text-center">Консоль управления статистикой</h1>
    <v-container>
      <v-row class="mb-10">
        <v-col
          lg="4"
          md="6"
          cols="12"
          v-for="input in inputs"
          :key="input.name"
        >
          <div class="d-flex align-center">
            <v-text-field
              v-model="input.value"
              :label="input.label.ru"
              outlined
              hide-details
              class="mr-4"
            />
            <v-btn color="success" @click="setInputs(input)">Отправить</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="4" cols="12">
          <h3>Live трансляции</h3>
          <table>
            <thead>
              <tr>
                <th>Название трансляции</th>
                <th>Ссылка для трансляции</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in live" :key="item._id">
                <td>
                  <v-text-field
                    v-model="item.name"
                    hide-details
                    label="Название"
                  />
                </td>
                <td>
                  <v-text-field v-model="item.value" hide-details />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <v-btn color="success" @click="setLive">Отправить</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="success"
      timeout="2000"
      centered
      color="green lighten-1"
    >
      Успешно сохранено
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="success = false"
          >Закрыть</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" timeout="5000" centered color="pink lighten-1">
      Ошибка сервера
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false"
          >Закрыть</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      inputs: [],
      live: [],
      success: false,
      error: false
    };
  },
  methods: {
    async getData() {
      let res = await this.$axios.get("getData");
      let inputs = res.data.inputs
        .filter(el => el.sortID)
        .sort((a, b) => a - b);
      this.inputs = inputs;
      this.live = res.data.live;
    },
    async setInputs(val) {
      try {
        let res = await this.$axios.post("insertInput", val);
        res.data.ok ? (this.success = true) : (this.error = true);
      } catch (error) {
        this.error = true;
      }
    },
    async setLive() {
      try {
        let res = await this.$axios.post("insertData", {
          col: "Live",
          data: this.live
        });
        let value = res.data.data;
        if (value) {
          this.live = value;
          this.success = true;
        } else {
          this.error = true;
        }
      } catch (error) {
        this.error = true;
      }
    },
    checked() {
      let token = sessionStorage.getItem("token");
      if (!token) {
        this.$router.push("/auth");
      } else {
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
      }
    }
  },
  created() {
    this.checked();
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss">
.home {
  padding: 30px 0;
  h3 {
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  td,
  th {
    padding: 10px;
    border: 1px solid #cacaca;
  }
}
</style>
