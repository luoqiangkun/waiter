<template>
  <cube-page type="no-header cuccess" title="下单成功">
    <div slot="content" class="main-wrapper">
      <img src="../../assets/images/succeed.png" alt="" class="pay-succeed">
      <div class="pay-box">
          <span class="pay-mark">支付成功</span>
          <span class="pay-hint">您已完成支付</span>
      </div>
      <div class="check-order" @click="goOrder">
          查看订单
      </div>
    </div>

  </cube-page>

</template>
<script>

import CubePage from '@/components/page'
import Loading from '@/components/loading'
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      order_id: ''
    };
  },
  methods: {
    goOrder(){
      this.$router.push(`/orderDetail/${this.order_id}`)
    }
  },
  created() {
    this.order_id = this.$route.params.id;
  }
};
</script>
<style lang="stylus" scoped>
  .cuccess {
    background:#fff;
    .main-wrapper {
      width: 100%;
      text-align: center;
      .pay-box {
        width: 100%;
        text-align: center;
        .pay-mark {
          font-size: 18px;
          font-weight: bold;
        }

        .pay-hint {
          font-size: 14px;
          color: #999;
          display: block;
          margin-top: 10px;
        }
      }
      .pay-succeed {
        display: block;
        width: 125px;
        margin: 50px auto;
      }

      .check-order {
        width: 80%;
        height: 48px;
        line-height: 48px;
        background: #fe7e00;
        font-size: 15px;
        font-weight: bold; 
        color: #fff;
        border-radius: 10px;
        margin: 50px auto;
      }
    }
  }
  
</style>