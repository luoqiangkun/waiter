<template>
  <cube-page type="order-info" title="订单">
    <template slot="header">
      <i @click="goBack" class="cubeic-back"></i>
    </template>

    <div slot="content" class="wrapper">
      <h1 class="h1-status">{{orderData.order_status_name}}</h1>
      <div class="contain">
        <div class="card">
          <div class="card-body">
            <div class="card-cell" @click="showRemark = !showRemark">
              <div class="card-cell__left ">
                 <div class="flex-row">
                  <svg t="1582955246119" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2953" width="20" height="20" style="margin-right:10px"><path d="M972.8 1024H51.2a51.2 51.2 0 0 1-51.2-51.2V51.2A51.2 51.2 0 0 1 51.2 0h921.6a51.2 51.2 0 0 1 51.2 51.2v921.6a51.2 51.2 0 0 1-51.2 51.2zM102.4 921.6h819.2V102.4H102.4z" p-id="2954" fill="#fe7e00"></path><path d="M204.8 204.8h256v256H204.8zM563.2 204.8h256v256H563.2zM204.8 563.2h256v256H204.8zM563.2 563.2h256v256H563.2z" p-id="2955" fill="#fe7e00"></path></svg>

                  桌台: {{orderData.table_name}}
                </div>   
              </div>
              <div class="card-cell__right" >
                <div class="flex-row">
                  <svg t="1582954178424" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4358" width="22" height="22" style="margin-right:10px"><path d="M510.6 404.1c55.9 0 101.3-44.5 101.3-99.2s-45.5-99.2-101.3-99.2c-55.9 0-101.3 44.5-101.3 99.2s45.5 99.2 101.3 99.2z m259.9 0c55.9 0 101.3-44.5 101.3-99.2s-45.5-99.2-101.3-99.2c-55.9 0-101.3 44.5-101.3 99.2-0.1 54.7 45.4 99.2 101.3 99.2z m-516.2 0c55.9 0 101.3-44.5 101.3-99.2s-45.4-99.2-101.3-99.2S153 250.2 153 304.9c-0.1 54.7 45.4 99.2 101.3 99.2z m444.9 364.5v99.3H318.7v-99.3h0.1c0.8-143.3 85.6-360.7 190.1-360.7 104.6 0 189.4 217.4 190.3 360.7zM378.1 467.4l-4.9 7.2c-32.3 47.2-84.9 219.1-84.9 294 0 5-0.4 10.1-0.2 15.1V868H65.7v-99.3h0.1C66.6 625.4 151.4 408 256 408c42.5 0 82.6 18.4 116.1 53.2l6 6.2zM959 768.6v99.3H736.5v-96.6c0-0.9-0.1-1.8-0.1-2.7 0-74.9-52.7-246.8-84.9-294l-4.9-7.2 6-6.3c33.5-34.8 73.7-53.2 116.2-53.2 104.5 0 189.3 217.4 190.2 360.7z" p-id="4359" fill="#d81e06"></path></svg>

                  人数: {{orderData.diners_number}}人
                </div>   
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell"><h3>{{orderData.store_name}}</h3></div>

            <div class="card-cell no-border" v-for="(item,i) in orderData.items">
              <div class="card-cell__left">
                <div class="card-cell__thumb">
                  <img :src="item.item_image" style="object-fit: contain;" />
                </div>

                <div class="card-cell__info">
                  <dl>
                    <dt>{{item.item_name}}</dt>
                    <dd>{{item.spec_name}}</dd>
                    <dd>x{{item.order_item_quantity}}</dd>
                  </dl>
                </div>
              </div>
              <div class="card-cell__right">
                <span class="price">￥{{item.order_item_price}}</span>
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">餐具费</div>
              <div class="card-cell__right">￥{{orderData.store_cutlery_fee ? orderData.store_cutlery_fee : 0}}</div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">服务费</div>
              <div class="card-cell__right">￥{{orderData.store_service_fee ? orderData.store_service_fee : 0}}</div>
            </div>


            <div class="card-cell">
              <div class="card-cell__left">满减优惠</div>
              <div class="card-cell__right">
                <i style="color:#fe7e00;">￥</i>
                <span class="mark">{{orderData.order_discount_amount}}</span>
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">优惠</div>
              <div class="card-cell__right">
                已优惠
                <span class="mark">￥{{orderData.order_discount_amount}}</span>
                ，小计￥{{orderData.order_payment_amount}}
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="card-cell">
              <h3>订单信息</h3>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">订单号</div>
              <div class="card-cell__right">
                {{orderData.order_id}}
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">支付方式</div>
              <div class="card-cell__right">
                在线支付
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">下单时间</div>
              <div class="card-cell__right">
                {{orderData.order_time}}
              </div>
            </div>

            <div class="card-cell">
              <div class="card-cell__left">订单备注</div>
              <div class="card-cell__right">
                {{orderData.order_remark}}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <loading v-show="loadShow"></loading>

  </cube-page>
</template>
<script>
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import { orderDetail } from "@/api";
export default {
  components: {
    CubePage,
    Loading
  },
  data() {
    return {
      orderData:{},
      loadShow:true
    };
  },
  methods: {
    getOrderData( order_id ){
      orderDetail({order_id:order_id}).then( res => {
        if( res.status === 200 ){
          this.orderData = res.data;
        }

        this.loadShow = false;
      })
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getOrderData(this.$route.params.id);
    }
    
  }
};
</script>


<style lang="stylus" scoped>

.order-info {
  background: #fafafa;
  height: 100%;

  .h1-status {
    padding: 5px 15px 5px;
    font-size: 20px;
    font-weight: 600;
  }
  .contain {
    padding: 10px;
    margin-bottom: 50px;
  }

  .card {
    position: relative;
    box-sizing: border-box;
    color: #4c4c4c;
    font-size: 0.9rem;
    background-color: #ffffff;
    margin-bottom: 0.8rem;
    border-radius: 0.25rem;
    padding:0px 15px;
    .card-body {
      min-height: 30px;
      .card-cell {
        position: relative;
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .flex-row {
          display: flex;
          align-items: center;
          height:14px;
          .store-logo {
            width:2rem;
            border-radius:50%;
            margin-right:10px;
            img {
              width:100%;
              border-radius: 50%;
            }
          }
        }

        h3 {
        font-weight:600;
        }
        .btn-group {
          width:100%;
          margin-top:15px;
          .btn {
            display: inline-block;
              padding: 8px 10px;
              border: 1px solid #fc9153;
              font-size: .9rem;
              color: #fc9153;
              border-radius: 5px;
          }
        }
        
        .card-cell__left {
          display: flex;
          justify-content: flex-start;
          margin-right: 0.8rem;
        }

        .card-cell__right {
        }
        .beizhu {
          width: 80%;
          text-align: right;
        }

        .card-cell__thumb {
          width: 2.5rem;
          height: 2.5rem;
          flex-grow: 0;
          flex-shrink: 0;
          margin-right: .8rem;
          img {
            width: 100%;
          }
        }

        .card-cell__info {
          flex-grow: 1;
          dl {
            dt {
              color: #333;
              font-size: 1rem;
              margin-bottom: 0.2rem;
              line-height: 1.2rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            dd {
              color: #999;
              font-size: 0.8rem;
              line-height: 1.3rem;
              margin-bottom: 0.2rem;
            }
          }
        }

        .price {
          color: #333;
          font-size: 1rem;
          font-weight: 600;
        }

        .line-through {
          color: #999;
          text-decoration: line-through;
        }
      }

      .card-cell:not(:last-child)::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 0;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }

      .card-cell.no-border::after {
        border-bottom: 0;
      }
    }
  }
}

</style>
