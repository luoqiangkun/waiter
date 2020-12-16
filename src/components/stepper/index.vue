<template>
<div class="stepper">
  <template v-if="cartMap[food.goods_id] && cartMap[food.goods_id].items && cartMap[food.goods_id].items[item.item_id]">
    <transition name="move">
      <div
        class="cart-decrease"
        @click.stop="decreaseItem(food,item.item_id)"
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
    <div class="cart-count">{{cartMap[food.goods_id].items[item.item_id].item_quantity}}</div>
  </template>

  <div @click.stop="increaseItem(food,item.item_id)" style="padding:6px">
    <img style="width:20px; height:20px" src="../../assets/images/add.png" alt />
  </div>
</div>
</template>

<script>

import {
  cartAdd,
  cartEdit,
  cartDelete,
} from "@/api"

export default {
  props: {
    food: {
      type: Object,
      default:()=>{}
    },
    cartMap: {
      type: Object,
      default:()=>{}
    },
    item:{
      type: Object,
      default:()=>{
        return {
          item_id:0,
          item_price:'',
          item_quantity:0,
          item_attribute:[]
        }
      }
    },
    table: {
      type: Object,
      default:()=>{}
    },
    cart_type: {
      type: Number,
      default:0
    }
  },
  data() {
    return {
      fshow:false
    }
  },
  methods: {
    //添加购物车 item_id 商品ID item_quantity 商品数量
    handleAddCart(item_id, item_quantity,item_attribute) {
      console.log( this.table );
      let action_id = this.table && this.table.action_id ? this.table.action_id : '';
      cartAdd({
        item_id: item_id,
        item_quantity: item_quantity,
        item_attribute:item_attribute,
        action_id:action_id,
        cart_type:this.cart_type
      }).then(res => {
        if (res.status === 200) {
          let cart = res.data;
          
          this.$emit('cart-map',cart);
        } else {
          this.toast = this.$createToast({
            txt: res.msg,
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //
    //编辑购物车 cart_id 购物车ID cart_quantity 商品数量
    handleEditCart(cart_id, cart_quantity,item_attribute) {
      let action_id = this.table && this.table.action_id ? this.table.action_id : '';
      cartEdit({ 
        cart_id: cart_id,
        cart_quantity: cart_quantity,
        item_attribute:item_attribute,
        action_id:action_id,
        cart_type:this.cart_type
      }).then(res => {
        if (res.status === 200) {
          let cart = res.data;
          this.$emit('cart-map',cart);
        } else {
          this.toast = this.$createToast({
            txt: res.msg,
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
            txt: res.msg,
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    //
    increaseItem(goods,item_id) {

      let item_attribute = [];
      if( this.item.item_id === item_id ){
        item_attribute = this.item.item_attribute
      }

      if (
        this.cartMap[goods.goods_id] &&
        this.cartMap[goods.goods_id].items &&
        this.cartMap[goods.goods_id].items[item_id]
      ) {
        let item = this.cartMap[goods.goods_id].items[item_id];
        let item_quantity = this.cartMap[goods.goods_id].items[item_id]
          .item_quantity;
        item_quantity++;

        if( item.activity_id && item.activity_type_id == 2 && item.activity_item_buylimit && (item_quantity == item.activity_item_buylimit + 1)){
          let txt = "折扣商品限购" + item.activity_item_buylimit + "份，超过" + item.activity_item_buylimit + "份恢复原价";

          this.toast = this.$createToast({
            txt: txt,
            type: 'txt'
          })
          this.toast.show()
        }
        
        this.handleEditCart(
          this.cartMap[goods.goods_id].items[item_id].cart_id,
          item_quantity,
          item_attribute
        );
      } else {
        this.handleAddCart(item_id, 1,item_attribute);
      }
    },
    decreaseItem( goods,item_id ) {
      let item_quantity = this.cartMap[goods.goods_id].items[item_id].item_quantity
      item_quantity--;
      if( item_quantity <= 0 ){
        this.handleRemoveCart(this.cartMap[goods.goods_id].items[item_id].cart_id);
      } else {
        this.handleEditCart(this.cartMap[goods.goods_id].items[item_id].cart_id,item_quantity);
      }
    },
  },
  watch: {
    food(data) {
      this.food = data;
    },
    cartMap(data) {
      this.cartMap = data;
    },
    form(data) {
      this.item = data;
    },
    table(data) {
      this.table = data;
    },
  },
  created(){

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
</style>
