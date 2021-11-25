<template>
  <div class="contact">
    <div class="contact__icon">
      <span class="material-icons">description</span>
    </div>

    <div class="contact__title">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style lang="scss">
.contact {
  display: flex;
  align-items: center;
  color: #333333;
  padding: 5px 0;
  border-bottom: 1px solid #eeeeee;
  &:hover {
    background: #f5f5f5;
  }
  &__icon {
    line-height: 1;
    margin-right: 15px;
    span {
      font-size: 55px;
      color: #cccccc;
    }
  }
}
</style>
