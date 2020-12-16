<template>
  <cube-popup type="center-popup" ref="specPopup" position="center" :mask-closable="true">
    <div class="card">
      <div class="card-header">{{food.goods_name}}</div>
      <div class="card-body">
        <div class="card-row">
          <p>规格</p>
          <div class="card-row__flex">
            <a
              href="javascript:;"
              :class="{'active' : item.item_id === row.item_id}"
              v-for="(row,i) in food.items"
              @click="handleSpecChange(row)"
            >{{row.spec_name}}</a>
          </div>
        </div>

        <template v-if="food.goods_attribute">
          <div class="card-row" v-for="(attribute,k) in food.goods_attribute" v-if="food.goods_attribute.length > 0">
            <p>{{attribute.name}}</p>
            <div class="card-row__flex">

              <a
                href="javascript:;"
                :class="{'active' : item.item_attribute[k] && item.item_attribute[k].value === value}"
                v-for="(value) in attribute.items"
                @click="handleAttributeChange(attribute.name,value,k)"
              >{{value}}</a>
            </div>
          </div>
        </template>
      </div>
      <div class="card-footer">
        <div class="total">
          <div class="total-amount">
            总计：
            <span class="mark" style="color:red">￥{{item.item_price}}</span>
          </div>
        </div>

        <stepper 
          :cartMap="cartMap" 
          :food="food" 
          :item="item"
          :table="table"
          :cart_type="cart_type"
          @cart-map="initCartMap"
        >
        </stepper>

      </div>
    </div>

    <div class="close" @click="hideSpecPopup">
      <img src="../../assets/images/close.png" />
    </div>
    
  </cube-popup>
  
</template>

<script>
import stepper from '@/components/stepper'
import {
  cartAdd,
  cartEdit,
  cartDelete,
} from "@/api"

export default {
  components: {
    stepper
  },
  props: {
    food: {
      type: Object,
      default:()=>{}
    },
    cartMap: {
      type: Object,
      default:()=>{}
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
      item:{
        item_id:0,
        item_price:'',
        item_quantity:0,
        item_attribute:[]
      },
      fshow:false
    }
  },
  methods: {
    initCartMap( cart ){
      this.$emit('cart-map',cart);
    },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
    },
    hideSpecPopup(){
       this.$refs.specPopup.hide()
    },
    handleSelectSpec( food ){
      const item_id =  food.items[0].item_id;
      const item_price =  food.items[0].item_price;
      this.item.item_id = item_id;
      this.item.item_price = item_price;
      const goods_attribute = [];
      if( food.goods_attribute ){
        for( let i in food.goods_attribute ){
          goods_attribute.push({name:food.goods_attribute[i].name,value:food.goods_attribute[i].items[0]})
        }
      }
      this.item.item_attribute = goods_attribute;
    },
    handleSpecChange(item){
      this.item.item_id = item.item_id;
      this.item.item_price = item.item_price;
    },
    handleAttributeChange(name, value, index) {
      this.item.item_attribute[index].value = value;
    }
  },
  watch: {
    food(data) {
      this.food = data;
    },
    cartMap(data) {
      this.cartMap = data;
    }
  },
  created(){

  }
};
</script>

<style lang="stylus">
  .cube-center-popup {
    .cube-popup-container, .cube-popup-mask {
      
    }
    .cube-popup-container {

      .cube-popup-content {
        width: 90%;
        background: #fff;
        border-radius: 8px;
        .card {
          .card-header {
            text-align: center;
            padding: 15px 20px 10px;
          }

          .card-body {
            padding: 5px 20px;
            min-height: 180px;
            .card-row {
              margin-bottom: 10px;
              p {
                color: #999;
                font-size: 12px;
                line-height: 2rem;
              }
              .card-row__flex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                a {
                  width: 30%;
                  display: inline-block;
                  text-align: center;
                  padding: 0.5rem 0;
                  border: 1px solid #efefef;
                  border-radius: 0.25rem;
                  box-sizing: border-box;
                  margin: 0.25rem 0;
                  font-size: 14px;
                  color: #333;
                }
                &:after {
                  content: '';
                  width: 30%;
                  border: 1px solid transparent;
                }
                
                a.active {
                  color: #fe7e00;
                  background: #fbf1df;
                  border: 1px solid #fe7e00;
                }
              }
            }
          }

          .card-footer {
            padding: 10px 20px 15px;
            display: flex;
            .total {
              display: flex;
              flex-grow: 1;
              justify-content: space-between;
              align-items: center;

              .total-discount {
                font-size: 0.8rem;
                color: #999;
                .mark {
                  font-size: 22px;
                  color: #f93232db;
                  font-weight: 600;
                }
              }
            }
            button {
              color: #fff;
              background: #fe7e00;
              border: 0;
              padding: 0.25rem 0.8rem;
              border-radius: 22px;
            }
          }
        }

        .close {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          margin-left: -15px;
          margin-top: 20px;
          border: 1px solid #fff;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          img {
            width: 60%;
            padding: 20%;
          }
        }
      }
    }
  }
  
</style>
