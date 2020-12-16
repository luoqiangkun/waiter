<template>
  <div class="home">
    <div class="top">
      <div class="back"></div>
      <h1>{{table.table_name}}</h1>
      <div class="order" @click="handleViewOrderRouter"></div>
    </div>
    <div class="searchBar" @click="goSearch">
      <img
        style="width:15px; height:15px;margin-left:10px;margin-right:10px"
        src="../../assets/images/search.png"
        alt
      />
      搜索菜名
    </div>
    <div class="homeBox">
      <cube-scroll-nav v-if="group[0]" :side="true" :data="group" :current="group[0].category_name">
        <cube-scroll-nav-panel
          v-for="(item,i) in group"
          :key="i"
          :label="item.category_name"
          :title="item.category_name"
        >
          <ul>
            <li v-for="(food,i) in item.category_goods" :key="i" class="rightLi" @click="goDetail(food.goods_id)">
              <div class="rowDiv" :itemId="food.items[0].item_id">
                <div class="imgWrapper">
                  <img :src="food.goods_image" alt class="img" />
                </div>
                <div class="info">
                  <h4>{{food.goods_name}}</h4>
                  <div class="sell">
                    月售
                    <span>{{8}}</span>
                    
                  </div>

                  <div class="discount" v-if="food.activity_id && food.activity_type_id == 2">
                    <i></i>
                    {{food.activity_discount_rate}}折

                    <span v-if="food.activity_item_buylimit" style="margin-left:10px">限{{food.activity_item_buylimit}}份</span>

                  </div>
                  <div class="price" v-if="food.activity_id && food.activity_type_id == 2">
                    <span>￥{{food.activity_item_price}}</span>

                    <span class="line-through">￥{{food.item_price}}</span>

                  </div>

                  <div class="price" v-else>￥{{food.item_price}}</div>
                </div>

                <div class="numbox">
                  <div
                    class="spec"
                    v-if="food.items.length > 1 || (food.goods_attribute && food.goods_attribute.length > 0 )"
                    @click.stop="showPopup(food)"
                  >
                    <a href="javascript:;" class="btn-primary__round">选规格</a>
                    <span
                      class="quantity"
                      v-if="cartMap[food.goods_id]"
                    >{{cartMap[food.goods_id].quantity}}</span>
                  </div>

                  <stepper 
                    :cartMap="cartMap" 
                    :food="food" 
                    :item="{item_id:food.items[0].item_id,item_price:food.items[0].item_price,}"
                    :cart_type="cart_type"
                    :table="table"
                    @cart-map="setCartMap"
                    v-else
                  >
                  </stepper>

                </div>

              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    
    <shop-car
      :cart="cart"
       @cart-map="setCartMap"
       @deal-order="handleOrderRouter"
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


    <loading v-show="loadShow"></loading>
    
  </div>
</template>
<script>
import Loading from '@/components/loading'
import ShopCar from '@/components/shopCar'
import stepper from '@/components/stepper'
import specPopup from '@/components/specPopup'

import { mapGetters, mapActions } from "vuex"
import { tableDetail } from "@/api"
  
export default {
  components: {
    Loading,
    ShopCar,
    stepper,
    specPopup
  },
  data() {
    return {
      active:'',
      fshow: false,
      store_id: 0,
      table_id: 0,
      store: {}, //店铺
      table: {}, //桌台
      cart: {}, //购物车
      category: [], //分类
      goods: [], //商品
      group: [], //商品分组 分类和分类下的商品
      goods_name: "",
      cartMap: {},
      food: {},
      form: {
        item_id: 0,
        item_quantity: 0,
        item_attribute: []
      },
      itemId: 0,
      current: 0,
      cart_type:1,
      loadShow:true
    };
  },
  methods: {
    //这里没有分开请求 直接一次获取了所有需要的数据 store category goods cart order
    getTableData() {
      tableDetail({ table_id: this.table_id }).then(res => {
        this.loadShow = false;
        const { table, store, cart, category, goods } = res.data;
        if (table) {
          this.table = table;
        }
        if (store) {
          this.store = store;
        }
        if (category) {
          this.category = category;
        }
        if (goods) {
          this.goods = goods;
        }
        if( cart ){
          this.cart = cart;
        }
        if( !table.action_id ){
          this.toast = this.$createToast({
            txt: '数据有误',
            type: 'txt'
          })
          this.toast.show()
          setTimeout(
            this.$router.push(`/table`)
          ,500)
        }

        this.getGroupData();
        this.initCartMap();
      
      });
    },
    getGroupData() {
      let group = [];
      let cart_id;
      for (let m in this.category) {
        group.push({
          category_id: this.category[m].category_id,
          category_name: this.category[m].category_name,
          category_goods: []
        });

        for (let n in this.goods) {
          if (this.goods[n].category_id === group[m].category_id) {
            group[m].category_goods.push(this.goods[n]);
          }
        }
      }
      this.group = group;
    },

    initCartMap() {
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
          cartMap[this.cart.items[m].goods_id].quantity += this.cart.items[
            m
          ].item_quantity;
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
    goSearch() {
      this.$router.push(`/search/${this.store_id}/${this.table_id}`);
    },
    goDetail( goods_id ){
      this.$router.push(`/indexDetail/${goods_id}/${this.table_id}`)
    },
    handleViewOrderRouter() {
    
      if( !this.table || !this.table.order_id ){
        this.toast = this.$createToast({
          txt: '您还未下单',
          type: 'txt'
        })
        this.toast.show()
        return;
      }
      
      return this.$router.push(`/placeOrder/${this.table.order_id}`);
    },
    handleOrderRouter(){
      if (this.cart && this.cart.items && this.cart.items.length > 0) {
        let cart_id = [];
        for (let i in this.cart.items) {
          cart_id.push(this.cart.items[i].cart_id);
        }

        if( this.table && this.table.order_id ){
          this.$router.push(`/confirm/${cart_id}/${this.table.order_id}`);
        } else {
          this.$router.push(`/confirm/${cart_id}`);
        }

      } else {
        this.toast = this.$createToast({
            txt: '请选择商品',
            type: 'txt'
          })
        this.toast.show()
      }
    }
  },
  created() {
    this.store_id = this.$route.params.store_id;
    this.table_id = this.$route.params.table_id;
    
    this.getTableData();
  }
};
</script>
<style lang="stylus">
.home {
  height: 100%;
  .top {
    position: absolute;
    margin: 0 auto;
    height: 2rem;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .back {
      position: absolute;
      left: 0;
    }
    .order {
      position: absolute;
      right: 0;
      opacity: .6;
      width:18px;
      height:18px;
      background:url('../../assets/images/order.png');
      background-report:no-report;
      background-position:50% 50%;
      background-size:100%;
      margin-right:.5rem;
    }
  }

  .searchBar {
    position: absolute;
    width: 90%;
    margin: 0 5%;
    height: 2rem;
    top: 2rem;
    border-radius: 20px;
    color: #828181;
    background-color: #EEEEEE;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    text-indent: 0.3rem;
  }

  .homeBox {
    position: fixed;
    top: 76px;
    left: 0;
    right: 0;
    bottom: 50px;
  }

  .rightLi .rowDiv {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.5rem 0;

    h4 {
      font-size: 14px;
      line-height: 1.2;
    }

    .imgWrapper {
      .img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.3rem;
      }
    }

    .info {
      margin-left: 0.3rem;

      h4 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 8rem;
        margin-bottom: 6px;
      }

      .sell {
        color: #b9b9b9;
        font-size: 0.7rem;
        margin-bottom: 6px;
         margin-top:10px;
      }

      .price {
        color: #fe7e00;
        font-weight:600;
        margin-top:5px;
        span {
          margin-right:10px;
        }
        .line-through {
          color:#999;
          font-size:14px;
          text-decoration: line-through;
        } 
      }
      .discount {
        color:#fe7e00;
        margin-top:5px;
        font-size:14px;
        display:flex;
        i {
          width:15px;
          height:15px;
          display:inline-block;
          background:url('../../assets/images/discount.png');
          background-size: 100%;
          background-repeat: no-repeat;
          margin-right:5px;
        }
      }
    }

    .numbox {
      position: absolute;
      right: 0.5rem;
      top: 2.5rem;
      .spec {
        .btn-primary__round {
          color: #fff;
          background: #fe7e00;
          border-radius: 22px;
          padding: 0.3rem 0.6rem;
          font-size: 0.7rem;
        }
      }
    }
  }
}


.cube-scroll-nav-bar-item {
  padding: 15px 15px !important;
}
.cube-scroll-nav-panel-title {
  padding: 15px 15px !important;
  font-size: 0.7rem;
  color: #666;
  background: #f8f8f8;
}

</style>