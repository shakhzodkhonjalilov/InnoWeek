<template>
  <div class="live">
    <div class="title">LIVE трансляции</div>
    <div class="container">
      <div class="row">
        <div class="col-xl-6" v-for="item in 4" :key="item">
          <div class="live__camera"></div>
          <div class="live__label">Название Трансляции</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
