<template>
  <form class="form">
    <div class="inputs">
      <input
        type="text"
        v-model="firstName"
        :placeholder="api.firstName"
        class="form__input"
        @input="changeName($event)"
      />
      <input
        type="text"
        v-model="secondName"
        :placeholder="api.secondName"
        class="form__input"
        @input="changeName($event)"
      />
    </div>
    <button class="btn" type="submit" @click.prevent="submit">
      {{ api.btn }}
    </button>
  </form>
</template>

<script>
export default {
  props: { api: Object },
  data() {
    return {
      firstName: "",
      secondName: ""
    };
  },
  methods: {
    submit() {
      if (this.firstName.length < 2 || this.secondName < 2) {
        let inputs = [...document.querySelectorAll(".form__input")];
        inputs.forEach(el =>
          el.value.length < 3 ? el.classList.add("error") : null
        );
        return false;
      }
      this.$emit("set-name", {
        firstName: this.firstName,
        secondName: this.secondName
      });
    },
    changeName(e) {
      if (e.target.value.length < 3) {
        e.target.classList.add("error");
      } else {
        e.target.classList.remove("error");
      }
    }
  }
};
</script>
