<template>
  <cube-page type="white-header orderokwrapper" title="下单成功">
    <template slot="header">
      <h1>下单成功</h1>
      <i @click="goBack" class="cubeic-back"></i>
    </template>
    <div slot="content" class="wrapper">
      <div class="receipt">
        <div class="card">
          <img src="../../assets/images/orderok.png" alt />
          <h4>下单成功</h4>
          <p>准备中，尽快为您服务</p>
          <div class="cardNum">订单编号</div>
          <div class="num">{{order_id}}</div>
        </div>
      </div>

      <div class="btn">
        <cube-button :primary="true" @click="handleViewOrderRouter">查看订单</cube-button>
      </div>

      <div class="addVeg" @click="handleAddMealRouter">继续加菜>></div>
    </div>
  </cube-page>
</template>
<script>
import { orderDetail } from "@/api"
import CubePage from '@/components/page'
export default {
  components: {
    CubePage
  },
  data() {
    return {
      order_id:'',
      order: {}
    };
  },
  methods: {
    getOrderDetail(order_id) {
      orderDetail({ order_id: order_id }).then(res => {
        if (res.status === 200) {
          this.order = res.data;
        }
      });
    },
    handleAddMealRouter() {
      return this.$router.push(
        `/home/${this.order.store_id}/${this.order.table_id}`
      );
    },
    handleViewOrderRouter() {
      return this.$router.push(`/placeOrder/${this.order.order_id}`);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    const order_id = this.$route.params.id;
    this.order_id = order_id;
    this.getOrderDetail(order_id);
  }
};
</script>
<style lang="stylus" scoped>
.orderokwrapper {
  background: #fafafa;
  width: 100%;
  height: 100%;
  .receipt {
    margin:2rem;
    background-color: #fff;
    box-shadow: 0px 20px 21px 0px rgba(232, 232, 232, 0.33);
    border-radius: 10px;
    .card {
      text-align: center;
      padding-top: 3rem;
      img {
        width: 6rem;
        height: 6rem;
      }

      h4 {
        color: #333;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        font-weight:600;
      }

      p {
        color: #717171;
        padding: .5rem;
      }

      .cardNum {
        position: relative;
        padding: 0.5rem 0;
        margin-top: 1rem;
        color: #717171;

        &:after {
          position: absolute;
          content: '';
          width: 100%;
          height: 1px;
          background: #dcdcdc;
          bottom: 0;
          left: 0;
        }
      }

      .num {
        height:42px;
        line-height:42px;
      }
    }
  }

  .addVeg {
    color: #fe7e00;
    text-align: center;
    margin-top: 1rem;
  }

  .btn {
    margin: 0 auto;
    width: 80%;
    margin-top: 3rem;
    z-index:0;
    button {
      width: 100%;
      background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
      box-shadow: 0 0 10px #d7d7d7;
      position: relative;
      padding: 12px 15px;
    }
  }
}

</style>