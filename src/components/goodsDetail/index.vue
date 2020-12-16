<template>
  <cube-page type="no-header goods-detail" title="订单">
    <div slot="content" class="wrapper">
      <div class="indexDetail">
        <div class="back">
            <i class="cubeic-back" @click="goBack"></i>
        </div>
        <div class="detailImg">
          <img :src="food.goods_image" alt="">
        </div>
        <div class="infoWrapper">
            <p class="title">{{food.goods_name}}</p>
            <div class="sales">月售30</div>
            <div class="priceStepper">
                <div class="price">￥{{food.goods_price}}</div>
                <div class="numbox">
                
                    <div class="selectBtn" @click="showPopup(food)" v-if="(food.items && food.items.length > 1 ) || (food.goods_attribute && food.goods_attribute.length > 0) ">选规格</div>
                    
                    <stepper 
                      :cartMap="cartMap" 
                      :food="food" 
                      :item="item"
                      :cart_type="cart_type"
                      :table="table"
                      @cart-map="setCartMap"
                      v-else
                    >
                    </stepper>
                </div>
            </div>
            <p class="detail">{{food.goods_desc}}</p>
        </div>
        
        <shop-car
          :cart="cart"
           @cart-map="setCartMap"
           @deal-order="goOrder"
        >
        </shop-car>

        <spec-popup
          :cartMap="cartMap" 
          :food="food" 
          :cart_type="cart_type"
          :table="table"
          ref="specPopup"
          @cart-map="setCartMap"
        >
        </spec-popup>

      </div>
    </div>
    
    <loading v-show="loadShow"></loading>
  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import Loading from '@/components/Loading'
import ShopCar from '@/components/shopCar'
import stepper from '@/components/stepper'
import specPopup from '@/components/specPopup'

import { storeCart,goodsInfo,tableInfo } from "@/api"
   
export default {
  components: {
    CubePage,
    Loading,
    ShopCar,
    stepper,
    specPopup
  },
  props:{
    goods_id:'',
    table_id:'',
    cart_type:'',
  },
  data() {
    return {
      food:{
        items:[]
      },
      store_id:'',
      item:{},
      cart:{},
      cartMap: {},
      table:{},
      loadShow:true
    };
  },
  methods: {
    getGoodsInfo(){
      goodsInfo({goods_id:this.goods_id}).then( res => {
        if( res.status === 200 ){
          this.food = res.data;
          
          const item = this.food['items'][0];
          this.item = {
            item_id:item.item_id,
            item_price:item.item_price,
            item_quantity:0,
            item_attribute:[]
          };

          this.store_id = this.food.store_id;

          this.getStoreCart( this.food.store_id );

          this.loadShow = false;
        } else {
          this.toast = this.$createToast({
            txt: '操作失败',
            type: 'txt'
          })
          this.toast.show()
        }
          
      })
    },
    getStoreCart( store_id ){
      storeCart({store_id:store_id,table_id:this.table_id}).then( res => {
          if( res.status === 200 ){
            if( Object.prototype.toString.call(res.data) ==='[object Object]' ){
              this.cart = res.data;

              if( this.cart ){
                  let store_item_quantity = 0;
                  for( let i in this.cart.items ){
                      store_item_quantity += this.cart.items[i].cart_quantity
                  }
                  this.cart.store_item_quantity = store_item_quantity;
              }

              this.initCartMap();
            }
          }
      })
    },
    getTableInfo(){
      tableInfo({table_id:this.table_id}).then( res => {
        if( res.status === 200 ){
          this.table = res.data;
        }else{
          this.toast = this.$createToast({
            txt: '数据有误',
            type: 'txt'
          })
          this.toast.show()
        }
      })
    },
    initCartMap(){
      let cartMap = {};
      if (this.cart) {
          for (let m in this.cart.items) {
            if (!cartMap[this.cart.items[m].goods_id]) {
              cartMap[this.cart.items[m].goods_id] = {
                id: this.cart.items[m].goods_id,
                name: this.cart.items[m].goods_name,
                quantity: 0,
                items: {}
              };
            }

            cartMap[this.cart.items[m].goods_id].items[
              this.cart.items[m].item_id
            ] = this.cart.items[m];
            cartMap[this.cart.items[m].goods_id].quantity += this.cart.items[m].item_quantity;
          }
      }
      this.cartMap = cartMap;
    },
    setCartMap( cart ){
      this.cart = cart;
      this.initCartMap();
    },
    showPopup( food ){
      this.food = food;
      this.$refs.specPopup.showPopup('specPopup');
      this.$refs.specPopup.handleSelectSpec(food);
    },
    goOrder(){
      if (this.cart && this.cart.items.length > 0) {
        let cart_id = [];
        let order_id = '';
        for (let i in this.cart.items) {
          cart_id.push(this.cart.items[i].cart_id);
        }
        if( this.table && this.table.order_id ){
          order_id = this.table.order_id
        } 
        this.$emit('to-order',cart_id,order_id);

      } else {
        this.toast = this.$createToast({
            txt: '请选择商品',
            type: 'txt'
          })
        this.toast.show()
      }
    },
    goBack() {
      this.$emit('goods-back',this.store_id,this.table_id);
    }
  },
  created(){
    this.getGoodsInfo();

    if( this.table_id ){
      this.getTableInfo();
    }
  }
};
</script>
<style lang="stylus" scoped>

.goods-detail {
  background:#fff;
  .indexDetail {
    padding-bottom: 50px;
    .back {
      position: fixed;
      left: 0.5rem;
      top: 0.5rem;
    }
    .detailImg {
      width: 100%;
      img {
          width: 100%;
          height: 100%;
      }
    }

    .infoWrapper {
      padding: 0.5rem;

      .title {
        font-size: 1rem;
        font-weight: 700;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 2px;
      }

      .sales {
        margin-top: 0.5rem;
        color: #666;
        font-size: 14px;
      }

      .priceStepper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .price {
            color: red;
            font-size: 20px;
            margin-top: 0.5rem;
        }

        .numbox {
            display: flex;
            align-items: center;
            .selectBtn {
              color: #fff;
              background: #fe7e00;
              border-radius: 1rem;
              padding: 0.3rem 0.6rem;
              font-size: 0.7rem;
            }
        }
      }

      .detail {
        margin-top: 0.5rem;
        color: #666;
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 2px;
      }
    }
  }  
}


</style>
