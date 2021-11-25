<template>
  <div class="statics page">
    <div class="text-center">
      <a href="https://innoweek.uz" class="logo">
        <img src="@/assets/images/logo.png" alt=""
      /></a>
    </div>
    <div class="row no-gutters justify-content-center">
      <div class="col-lg-8 col-xl-6">
        <Stat />
      </div>
    </div>
  </div>
</template>

<script>
import Stat from "@/components/Stat";
export default {
  components: { Stat },
  name: "Statics"
};
</script>
