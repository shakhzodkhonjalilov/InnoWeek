<template>
  <div class="stat__diagram">
    <slot name="title"></slot>
    <ul class="bar">
      <li v-for="item in items" :key="item.label" class="bar__item">
        <div class="bar__item-color" :style="{ height: item.procent, backgroundColor: item.color }"></div>
        <strong>{{ item.value }}</strong>
        <p>{{ item.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { barData: Array },
  computed: {
    items() {
      let colors = ["#00E2C4", "#FFF600", "#C721C5"];
      return this.barData.map((el, idx) => {
        let procent = parseInt((el.value / this.barData[0].value) * 100) + "%";
        let value = el.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return {
          color: colors[idx],
          label: el.label,
          value,
          procent
        };
      });
    }
  },
  methods: {
    bar(val) {
      console.log(val);
      return val;
    }
  }
};
</script>
