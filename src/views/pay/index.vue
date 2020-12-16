<template>
  <cube-page type="pay" title="付款">

    <template slot="header">
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="main">
      <div class="title">本次应收</div>
      <div class="amount">￥{{order_amount}}</div>

      <div class="paybox">
        <div class="input-box">
          <cube-input v-model="cash_amount" placeholder="实收金额"></cube-input>
        </div>
        <div class="keyboard">
          <div class="left">
            <div v-for="(item,i) in dataNumber" :key="i" @click="getNum(item)" class="everyNum" ref="everyNum"><span style="position: absolute;">{{item}}</span></div>
          </div>
          <div class="right">
            <div @click="delOnce">删除</div>

            <div class="enter" @click="pay">
              结账
            </div>

          </div>
        </div>
      </div>
      
      
    </div>
  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import { pay } from '@/api'
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      order_id:'',
      order_amount:'',
      cash_amount:'',
      payment_channel_code : '',
      dataNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0,'00',"."]
    };
  },
  methods: {
    getNum(a) {
      this.cash_amount += a;
      // let totalData=''
    },
    del(){
      this.cash_amount = "";
    },
    delOnce(){
        this.cash_amount= this.cash_amount.substring(0,this.cash_amount.length-1)
    },
    pay(){
      if( !this.cash_amount ){
        this.toast = this.$createToast({
            txt: "请输入支付金额",
            type: "txt"
          });
          this.toast.show();
          return;
      }
      let data = {
        cash_amount:this.cash_amount,
        order_id:this.order_id,
        from:'waiter'
      };
      
      pay( data ).then( res => {
        if( res.status === 200 ){
          return this.$router.push(`/paySuccess/${this.order_id}`);
        } else {
          this.toast = this.$createToast({
            txt: "操作失败",
            type: "txt"
          });
          this.toast.show();
          return;
        }
      })
    },
    goBack() {
      this.$router.go(-1);//返回上一层
    }
  },
  created(){
    this.order_id = this.$route.params.order_id;
    this.order_amount = this.$route.params.order_amount;
  }
}; 
</script>
<style lang="stylus" scoped>
.pay {
  .main {
    .title,.amount {
      padding:10px 0;
      text-align: center;
    }
    .amount {
      font-size:30px;
      color:#fca046;
      font-weight:600;
    }
    .paybox {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .cube-input {
      padding:10px;
      font-size:18px;
    }
    .keyboard {
      display: flex;
      background:#fff;
      .left {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        div {
          width: 33.33%;
          padding-top: 33.33%;
          position:relative;
          border: 1px solid #fff;
          border-top:0;
          background: #f5f5f5;
          box-sizing: border-box;
          span {
            display: flex;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            line-height: 100%;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .right {
        width: 25%;
        display:flex;
        flex-wrap:wrap;
        div {
          width:100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color:#666;
        }
        .enter {
          background: #FCA046;
          color:#fff;
        }
      }
    }
  }
}

</style>