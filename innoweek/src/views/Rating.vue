<template>
  <div class="rating">
    <div class="container">
      <div class="rating__top">
        <a href="/" class="logo">
          <img src="@/assets/images/logo-white.png" alt="" />
        </a>
        <h1><span>Топ</span> Like</h1>
      </div>

      <ul class="rating__list">
        <li
          class="rating__list-stand"
          :class="{ active: idx < 3 }"
          v-for="(stand, idx) in rating"
          :key="idx"
        >
          <span>{{ stand.name }}</span>
          <span>{{ stand.likes }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: []
    };
  },
  methods: {
    async getRating() {
      let res = await this.$axios("https://show.innoweek.uz/api/stand/rating");
      this.rating = await res.data.data;
    }
  },
  mounted() {
    this.getRating();
  }
};
</script>
