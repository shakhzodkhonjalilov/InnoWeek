<template>
  <div class="stat__card">
    <div class="stat__card-content">
      <div class="stat__card-img" v-if="input.icon">
        <img :src="input.icon" alt />
      </div>
      <div v-html="input.value"></div>
    </div>
    <p>{{ input.label[lang] }}</p>
  </div>
</template>

<script>
export default {
  props: {
    input: Object,
    lang: String
  }
};
</script>
