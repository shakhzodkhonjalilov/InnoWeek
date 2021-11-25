<template>
  <div class="page live_page">
    <div class="text-center">
      <a href="https://innoweek.uz" class="logo">
        <img src="@/assets/images/logo.png" alt=""
      /></a>
    </div>
    <Live />
  </div>
</template>

<script>
import Live from "@/components/Live";
export default {
  components: { Live }
};
</script>
