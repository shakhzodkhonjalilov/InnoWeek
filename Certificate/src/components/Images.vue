<template>
  <div class="images">
    <div class="images__container">
      <div class="lenta" ref="lenta">
        <img :src="imageHandler('lenta')" alt="" />
        <div class="name" v-html="correctName"></div>
      </div>
    </div>
    <div class="images__container">
      <div class="story" ref="story">
        <img :src="imageHandler('story')" alt="" />
        <div class="name" v-html="correctName"></div>
      </div>
    </div>
    <a :href="lenta" download="InnoWeek Certificate" class="btn">
      {{ api.lenta }}
    </a>
    <a :href="story" download="InnoWeek Certificate 2" class="btn">
      {{ api.story }}
    </a>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  props: { user: Object, api: Object, lang: String },
  data() {
    return {
      done: false,
      story: null,
      lenta: null
    };
  },
  computed: {
    correctName() {
      let user = Object.values(this.user);
      return user.join("<br />");
    }
  },
  methods: {
    canvasHandler() {
      const options = {
        width: 1080,
        windowWidth: 1080,
        height: 1920,
        windowHeight: 1920,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0
      };
      setTimeout(() => {
        html2canvas(this.$refs.story, options).then(canvas => {
          this.story = canvas.toDataURL("image/jpeg");
        });
        html2canvas(this.$refs.lenta, { ...options, height: 1080 }).then(
          canvas => {
            this.lenta = canvas.toDataURL("image/jpeg");
          }
        );
        this.done = true;
      }, 0);
    },
    imageHandler(name) {
      return require(`@/assets/images/${name}-${this.lang}.jpg`);
    }
  },
  mounted() {
    this.canvasHandler();
  }
};
</script>

<style></style>
