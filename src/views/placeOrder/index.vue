<template>
  <cube-page type="white-header placeOrder" title="下单成功">
    <template slot="header">
      <h1>桌台 {{order.table_name}}</h1>
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="wrapper">
      <div class="orderNum">订单号：{{order.order_id}}</div>
      <ul class="list">
        <li class="item" :key="i" v-for="(item,i) in order.items">
          <div class="tableImg">
            <img :src="item.item_image" alt />
          </div>
          <div class="mealName">
            <div class="name">{{item.item_name}}</div>
            <div class="crumb">
              <span v-if="item.item_spec">{{item.item_spec}}</span>

            </div>
          </div>
          <div class="num">
            <span>x{{item.order_item_quantity}}</span>
            <span style="color:#878787">￥{{item.order_item_price}}</span>
          </div>
          <div class="del" v-if="order.order_status == 1 && cancel_dishes_enble">
            <span @click="handleDelMeal(item.order_item_id)" >
              <img style="width:16px; height:16px" src="../../assets/images/del.png" alt />
            </span>
          </div>
        </li>
      </ul>

      <div class="footer">
        <div class="bottomBar">
         <div class="total">
          合计：
          <span class="price">￥ {{order.order_payment_amount}}</span>

          <span class="edit" @click="showAlert" v-if="order.order_status == 1 && modify_order_enable">
            <img src="../../assets/images/edit.png" />
          </span>
          </div>
          <div class="btn" v-if="order.order_status == 1">
            <button @click="handleCancleOrder">取消</button>
            <button @click="handleAddMealRouter">加菜</button>
            <button @click="handlePayOrderRouter">结算</button>
          </div>
          <div class="status" v-else>
            <button>{{order.order_status_name}}</button>
          </div>
        </div>
      </div>
      
    </div>

    <div class="addition" :class="additionShow ? 'animation-up' : ''" v-show="order_cutlery_fee > 0 || order_service_fee > 0">
      <div class="addition-mask" @click.stop="additionShow = !additionShow" v-if="order.order_status == 1"></div>
      <div class="addition-wrapper">
        <div class="addition-content" v-if="order.order_status == 1">
          <cube-checkbox 
            v-model="orderTablewareFeeChecked" 
            position="right"
            :option="{}"
            @input="handleInput1"
            >
            <span>餐具费</span>
            <span>￥{{order_cutlery_fee}}</span>
          </cube-checkbox>

          <cube-checkbox 
            v-model="orderServiceFeeChecked" 
            position="right"
            :option="{}"
            @input="handleInput2"
            >
            <span>服务费</span>
            <span>￥{{order_service_fee}}</span>
          </cube-checkbox>

        </div>
        <div class="addition-bar" @click.stop="additionShow = !additionShow">
          <div class="left">
            <i class="editor"></i>
            附加费
          </div>
          <div class="right">
            <span>餐具费 ￥{{order.order_cutlery_fee}}</span>
            <span>服务费 ￥{{order.order_service_fee}}</span>
          </div>
        </div>
      </div>
    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>

</template>
<script>
import { waiterInfo, orderDetail, storeConfig,deleteOrderItem, modifyOrder,modifyOrderFee,modifyOrderStatus } from "@/api";
import CubePage from '@/components/page'
import Loading from '@/components/loading'
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      order: {},
      user: {},
      order_cutlery_fee:'',
      order_service_fee:'',
      orderTablewareFeeChecked:false,
      orderServiceFeeChecked:false,
      modify_order_enable: false,
      cancel_dishes_enble:false,
      options1:'餐具费',
      options2:'服务费',
      loadShow:true,
      additionShow:false
    };
  },
  methods: {
    getUserInfo() {
      waiterInfo().then(res => {
        this.user = res.data;
      });
    },
    getOrderDetail(order_id) {
      orderDetail({ order_id: order_id }).then(res => {
        if (res.status === 200) {
          this.order = res.data;
          this.loadShow = false;

          if( res.data.order_cutlery_fee ){
            
            this.orderTablewareFeeChecked = true;
          }

          if( res.data.order_service_fee ){
            
            this.orderServiceFeeChecked = true;
          } 

          this.getStoreConfig( res.data.store_id );
        }
      });
    },
    getStoreConfig( store_id ){
      storeConfig({store_id:store_id}).then( res => {
        if( res.status === 200 ){
          this.order_cutlery_fee = res.data.sc_charge_cutlery_fee;
          this.order_service_fee = res.data.sc_charge_service_fee;

          this.modify_order_enable = res.data.sc_allow_waiter_modify_order_amount;

          this.cancel_dishes_enble = res.data.sc_allow_waiter_cancel_dishes;
        }
      })
    },
    showAlert() {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: "订单金额",
        prompt: {
          value: "",
          placeholder: "请输入订单金额"
        },
        onConfirm: (e, promptValue) => {
          this.handleModifyOrderAmount(promptValue);
        }
      }).show();
    },
    handleDelMeal(order_item_id) {
      this.$createDialog({
        type: 'confirm',
        title: '确认要删除商品吗？',
        onConfirm: () => {
          deleteOrderItem({
            order_id: this.order.order_id,
            order_item_id: order_item_id
          }).then(res => {
            if (res.status === 200) {
              this.order = res.data;
            } else {
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          });
        }
      }).show();
    },
    handleModifyOrderAmount(order_amount) {
      modifyOrder({
        order_id: this.order.order_id,
        order_amount: order_amount
      }).then(res => {
        if (res.status === 200) {
          this.order = Object.assign(this.order, res.data);
        } else {
          this.toast = this.$createToast({
            txt: "操作失败",
            type: "txt"
          });
          this.toast.show();
        }
      });
    },
    handleAddMealRouter() {
      return this.$router.push(
        `/home/${this.order.store_id}/${this.order.table_id}`
      );
    },
    handlePayOrderRouter() {
      return this.$router.push(`/pay/${this.order.order_id}/${this.order.order_payment_amount}`);
    },
    handleInput1( checked ){
      if( this.order_cutlery_fee == 0 ){
        reutrn;
      }
      modifyOrderFee({
        order_id: this.order.order_id,
        order_cutlery_fee: checked ? this.order_cutlery_fee : -this.order_cutlery_fee
      }).then(res => {
        if (res.status === 200) {
          this.order = Object.assign(this.order, res.data);
        } else {
          this.toast = this.$createToast({
            txt: "操作失败",
            type: "txt"
          });
          this.toast.show();
        }
      });
    },
    handleInput2( checked ){
       if( this.order_service_fee == 0 ){
        reutrn;
      }
      modifyOrderFee({
        order_id: this.order.order_id,
        order_service_fee: checked ? this.order_service_fee : -this.order_service_fee
      }).then(res => {
        if (res.status === 200) {
          this.order = Object.assign(this.order, res.data);
        } else {
          this.toast = this.$createToast({
            txt: "操作失败",
            type: "txt"
          });
          this.toast.show();
        }
      });
    },
    handleCancleOrder(){
      this.$createDialog({
        type: 'confirm',
        title: '确认要取消订单吗？',
        onConfirm: () => {
          modifyOrderStatus({
            order_id: this.order.order_id,
            order_status: 6
          }).then(res => {
            if (res.status === 200) {
              return this.$router.push(
                `/orderDetail/${this.order.order_id}`
              );
            } else {
              this.toast = this.$createToast({
                txt: '操作失败',
                type: 'txt'
              })
              this.toast.show()
            }
          });
        }
      }).show();
    },
    removeShow() {
      this.showPopup = false;
    },
    goBack() {
      this.$router.go(-1);//返回上一层
    }
  },
  created() {
    let order_id = this.$route.params.id;
    this.getOrderDetail(order_id);
    this.getUserInfo();
  }
};
</script>
<style lang="stylus">
.placeOrder {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fafafa;

  .orderNum {
    position: relative;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: .5rem;
    font-size: 0.8rem;
    color: #9e9e9e;
    background: #fff;
  }

  .list {
    margin-bottom: 50px;
    background: #fff;
    .item {
      position: relative;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .num {
        display: flex;
        display: flex;
        width: 26%;
        justify-content: space-between;
      }

      .tableImg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .mealName {
        flex-grow: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .name {
          padding:.5rem 0;
        }
        .crumb {
          color: #999;
          font-size: 14px;
        }
      }

      .del {
        margin-left:2rem;
      }
    }

    .item::after {
      content: '';
      width: 96%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 2%;
      background: #dcdcdc;
    }
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    .bottomBar {
      display: flex;
      align-items: center;
      height: 3rem;
      box-sizing: border-box;
      padding: 0 0.5rem;
      box-shadow: 0px 5px 29px 0px rgba(6, 0, 1, 0.1);
      background-color: #fff;
      justify-content: space-between;
      z-index: 12;

      .total {
        display: flex;
        align-items: center;
      }

      .price {
        color: #FE7E00;
        font-weight: 600;
        font-size: 20px;
      }

      .edit {
        width: 15px;
        height: 15px;
        margin-left: 10px;
        opacity: 0.6;
      }

      .edit img {
        width: 100%;
      }

      .btn {
        position: absolute;
        right: 0.5rem;

        button {
          border-radius: 1rem;
          margin-right: 0.25rem;
          border: none;
          color: #fff;
          padding: 7px 24px;
          background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
          box-shadow:0px 5px 10px 0px rgba(254,126,0,0.4);
        }
      }
      .status {
        height: 3rem;
        button {
          height: 100%;
          border: none;
          color: #fff;
          padding:0 20px;
          background: linear-gradient(0deg, rgba(254, 126, 0, 1), rgba(255, 172, 90, 1));
        }
      }
    }
  }
  
  .addition {
    position: fixed;
    width: 100%;
    bottom: 3rem;
    left:0;
    z-index:99;
    .addition-mask {
      display:none;
      position: absolute;
      width: 100%;
      bottom: 0;
      left:0;
      top:0;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .addition-wrapper {
      position: absolute;
      width: 100%;
      bottom: 0;
      z-index:999;
      .addition-content {
        background:#fff;
        display:none;
        .cube-checkbox {
          .cube-checkbox-wrap {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            padding-right: 30px;
          }
        }
      }
      .addition-bar {
        height: 1rem;
        font-size:12px;
        color:#666;
        padding: .65rem .5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background:#f5f5f5;
        .editor {
          width: 14px;
          height: 14px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 3px;
          background:url('../../assets/images/editor.png');
          background-size: 100%;
          opacity: 0.4;
        }
      }
    }
  }
  .addition.animation-up {
    top:0;
    .addition-mask {
      display:block;
    }
    .addition-wrapper {
      .addition-content {
        display:block;
      }
    }
  }
}
</style>