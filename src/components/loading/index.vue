<template>
  <div class="loadding" :type="type">
    <div class="wrapper">
      <cube-loading></cube-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus">
.loadding {
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin:auto;
  background:#fff;
  z-index:999;
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>