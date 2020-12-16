<template>
  <div class="shopCartBar">
    <div class="shopBarWrapper">
      <div class="shopCar">
        <div class="content">
          <div class="content-left" @click="showCar">
            <div class="logo-wrapper">
              <img class="logo" src="../../assets/images/shopCar.png" alt />
              <div class="num" v-if="cart.store_item_quantity">{{cart.store_item_quantity}}</div>
            </div>
            <div class="price">合计：</div>
            <div class="desc">{{ cart.store_payment_amount? '￥'+ cart.store_payment_amount :'' }}</div>
          </div>
          <div class="content-right">
            <div class="pay" @click="handleOrderRouter">去下单</div>
          </div>
        </div>
      </div>
    </div>

    <div class="fb_box" :class="[ fshow ? 'show' : '']" @click="removeShow">
      <div class="fb_layer" :class="[ fshow ? 'show' : '']">

        <div class="fb_layer_tip" v-if="cart.store_activity && cart.store_activity.reduction">
          {{cart.store_activity.reduction.label}}
        </div>

        <div class="fb_layer_con">
          <div class="bar">
            <div>已选商品</div>
            <div @click="clearCart" style="display: flex;justify-content: center;align-items: center;">
              <svg t="1587352663118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1502" width="16" height="16"><path d="M517.59 21.609c-100.299 0-181.703 79.514-185.167 179.34H98.603c-25.979 0-47.235 21.099-47.235 47.236 0 25.98 21.099 47.237 47.236 47.237h52.117v528.416c0 99.196 67.233 180.285 150.37 180.285h423.55c82.98 0 150.37-80.616 150.37-180.285V295.737h47.236c25.98 0 47.236-21.1 47.236-47.237 0-25.98-21.099-47.236-47.236-47.236H702.441C699.449 101.124 617.888 21.61 517.59 21.61z m-96.677 179.34c3.464-51.172 45.19-90.85 96.834-90.85s93.37 39.835 96.362 90.85H420.913z m-119.98 714.842c-29.444 0-61.88-37.789-61.88-91.953V295.737h547.311V824.31c0 54.007-32.436 91.954-61.88 91.954H300.933v-0.473z m0 0" p-id="1503" fill="#666666"></path><path d="M364.387 802.267c21.57 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.572 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.32 48.653 39.364 48.653z m142.496 0c21.571 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.571 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.793 48.653 39.364 48.653z m149.896 0c21.571 0 39.364-21.571 39.364-48.653V476.022c0-27.082-17.635-48.654-39.364-48.654-21.571 0-39.363 21.572-39.363 48.654v277.592c0 26.924 17.162 48.653 39.363 48.653z m0 0" p-id="1504" fill="#666666"></path></svg>
              清空</div>
          </div>

          <ul class="ulList">
            <li v-for="(item,i) in cart.items" :key="i" class="liItem">
              <dl class="item_name">
                <dt>{{item.item_name}}</dt>
                <dd>{{item.spec_name}}</dd>
              </dl>
              
              <div class="item_price">{{item.item_actual_price}}</div>

              <div class="stepper">
                <template>
                  <transition name="move">
                    <div
                      class="cart-decrease"
                      @click.stop="decreaseCart(item)"
                      style="padding: 6px"
                    >
                      <img
                        class="inner"
                        style="width:20px; height:20px"
                        src="../../assets/images/decrease.png"
                        alt
                      />
                    </div>
                  </transition>
                  <div class="cart-count">{{item.item_quantity}}</div>
                </template>

                <div
                  @click.stop="increaseCart(item)"
                  style="padding:6px"
                >
                  <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import {
  storeData,
  cartAdd,
  cartEdit,
  cartDelete,
  cartClear
} from "@/api"

export default {
  props: {
    cart: {
      type: Object,
      default:()=>{}
    }
  },
  data() {
    return {
      fshow:false
    }
  },
  methods: {
    showCar() {
      if (!this.cart || !this.cart.items || this.cart.items.length == 0) {
        return;
      } else {
        this.fshow = !this.fshow;
      }
    },
    removeShow() {
      this.fshow = false;
    },
    increaseCart( item ){
      let cart_id = item.cart_id;
      let cart_quantity = item.cart_quantity;
      cart_quantity++;

      if( item.activity_id && item.activity_type_id == 2 && item.activity_item_buylimit && (cart_quantity == item.activity_item_buylimit + 1)){
        let txt = "折扣商品限购" + item.activity_item_buylimit + "份，超过" + item.activity_item_buylimit + "份恢复原价";
        
        this.toast = this.$createToast({
          txt: txt,
          type: 'txt'
        })
        this.toast.show()
      }
      
      this.handleEditCart(cart_id,cart_quantity);
    },
    decreaseCart( item ){
      let cart_id = item.cart_id;
      let cart_quantity = item.cart_quantity;
      cart_quantity--;
      if( cart_quantity <= 0 ){
        this.handleRemoveCart(cart_id);
      } else {
        this.handleEditCart(cart_id,cart_quantity);
      }
    },
    //编辑购物车 cart_id 购物车ID cart_quantity 商品数量
    handleEditCart(cart_id, cart_quantity,item_attribute) {
      cartEdit({ cart_id: cart_id, cart_quantity: cart_quantity,item_attribute:item_attribute }).then(res => {
        if (res.status === 200) {
          let cart = res.data;
          this.$emit('cart-map',cart);
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //删除购物车 cart_id 购物车ID
    handleRemoveCart(cart_id) {
      cartDelete({ cart_id: cart_id }).then(res => {
        if (res.status === 200) {
          let cart = res.data;
          this.$emit('cart-map',cart);
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    clearCart() {
      cartClear({store_id:this.cart.store_id}).then( res => {
        if( res.status === 200 ){
          this.$emit('cart-map',{});
        }else{
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
      })
    },
    //
    handleOrderRouter(){
      this.$emit('deal-order');
    },
  },
  watch: {
    cart(data) {
      this.cart = data;
    }
  },
  created(){

  }
};
</script>
<style lang="stylus" scoped>
.shopCartBar {
  .shopBarWrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 111;
    box-shadow: 0 0 10px #d7d7d7;
  }
  .shopCar {
    height: 100%;
    .content {
      display: flex;
      background: #fff;
      font-size: 0;
      color: #999;
      height: 100%;

      .content-left {
        flex: 1;
        display: flex;

        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          box-sizing: border-box;
          border-radius: 50%;

          .logo {
            width:30px;
            margin-left: 3px;
            margin-right: 9px;
            margin-top: 6px;
          }
          .num {
            font-size: 10px;
            line-height: 1.4;
            position: absolute;
            top: 3px;
            left: 84%;
            margin-left: -10px;
            padding: 1px 5px;
            color: #fff;
            background: #FE7E00;
            border-radius: 100px;
          }
        }

        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
        }

        .desc {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          font-size: 10px;
          color: #FE7E00;
          font-size: 16px;
        }
      }

      .content-right {
        width: 105px;
        display: flex;
        align-items: center;
        justify-content: center;

        .pay {
          text-align: center;
          font-weight: 700;
          font-size: 12px;
          background: #FE7E00;
          color: #fff;
          padding: 10px 20px;
          border-radius: 20px;
          background: linear-gradient(0deg,rgba(254,126,0,1),rgba(255,172,90,1));
          box-shadow: 0px 5px 21px 0px rgba(254,126,0,0.4);
        }
      }
    }
  }

  .fb_box {
    position: fixed;
    top: 100%;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 110;
    background-color: rgba(0, 0, 0, 0.7);
    .fb_layer {
      position: absolute;
      -webkit-transform: translate3d(0, 495px, 0);
      transform: translate3d(0, 495px, 0);
      -webkit-transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
      transition: -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
      transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1);
      transition: transform 0.2s cubic-bezier(0, 0, 0.25, 1), -webkit-transform 0.2s cubic-bezier(0, 0, 0.25, 1);
      bottom: 0;
      bottom: constant(safe-area-inset-bottom);
      bottom: env(safe-area-inset-bottom);
      width: 100%;
      max-height: 350px;
      background-color: #fff;
      .fb_layer_tip {
        text-align:center;
        background-color: #fef0f0;
        color: #f56c6c;
        padding:5px;
        font-size:14px;
      }
      .fb_layer_con {
        max-height: 350px;
        box-sizing: border-box;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .bar {
          position: fixed;
          width: 100%;
          display: flex;
          background: #eceff1;
          justify-content: space-between;
          padding: 10px;
          box-sizing: border-box;
          z-index: 1;
          color: #666;
        }

        .ulList {
          background-color: #fff;
          padding-top: 30px;
          .liItem {
            display: flex;
            padding: 0.5rem;
            justify-content: space-between;
            align-items: center;
            .item_name {
              font-weight: 700;
              width: 70%;
              line-height: 1.5rem;
              dd {
                color:#999;
                font-size:14px;
              }
            }

            .item_price {
              color: #FE7E00;
            }

            .stepper {
              display: flex;
              align-items: center;

              .cart-decrease {
                display: inline-block;
                padding: 6px;
                opacity: 1;

                .inner {
                  display: inline-block;
                  line-height: 24px;
                  transition: all 0.3s linear;
                  transform: rotate(0);
                }

                &.move-enter-active, &.move-leave-active {
                  transition: all 0.3s linear;
                }

                &.move-enter, &.move-leave-active {
                  opacity: 0;
                  transform: translate3d(24px, 0, 0);

                  .inner {
                    transform: rotate(180deg);
                  }
                }
              }

              .cart-count {
                width: 16px;
                padding: 2px;
                line-height: 24px;
                overflow: hidden;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  .show.fb_box {
    top: 0;
    .fb_layer {
      position: absolute;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
}

</style>
