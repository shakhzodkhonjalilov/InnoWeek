<template>
  <div class="stat__card">
    <div class="stat__card-content">
      <div class="pl-2" v-if="input.icon">
        <img :src="input.icon" alt />
      </div>
      <div>{{ input.value }}</div>
    </div>
    <p>{{ input.label }}</p>
  </div>
</template>

<script>
export default {
  props: {
    input: Object
  }
};
</script>
