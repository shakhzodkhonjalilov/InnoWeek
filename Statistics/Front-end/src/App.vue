<template>
  <div id="app">
    <div class="row no-gutters">
      <div class="col-lg-6">
        <Stat />
      </div>
      <div class="col-lg-6">
        <Live />
      </div>
    </div>
  </div>
</template>

<script>
import Stat from "./components/Stat";
import Live from "./components/Live";
export default {
  components: { Stat, Live },
  name: "App"
};
</script>
