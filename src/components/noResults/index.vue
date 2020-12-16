<template>
  <div class="no-results" :type="type">
    <div class="wrapper">
      <p>{{desc ? desc : "暂无数据~~"}}</p>
      <img src="../../assets/images/cry.png" />
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
.no-results {
  position: relative;
  top: 100px;
  .wrapper {
    flex-wrap: wrap;
    text-align: center;
    opacity: 0.5;
  }
  p {
    width: 100%;
    color: #666;
    margin-bottom: 20px;
    font-size: 14px;
  }
}
</style>