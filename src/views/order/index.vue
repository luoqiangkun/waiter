<template>
  <cube-page type="no-header order" title="订单">
    <div slot="content" class="main">
    
    <h3>订单</h3>
      <p>订单总数：{{data.items.length}}</p>
      <div class="tab">
        <a
          href="javascript:;"
          v-for="(item,i) in tab"
          :key="i"
          @click="handleTabChange(item.value)"
          :class="[order_status == item.value ? 'active': '']"
        >{{item.label}}</a>
      </div>
      <cube-scroll :data="data.items" 
        ref="scroll"
        :options="options"
        class="scroll-list-wrap"
        @pulling-up="onPullingUp"
        :style="{height:scrollHeight + 'px'}">
        <ul class="list" v-if="data.items.length > 0 ">
          <li
            class="item"
            v-for="(item,i) in data.items"
            @click="handlePlaceOrderRouter(item.order_id)"
          >
            <div class="leftImg">
              <img :src="item.items ? item.items[0].item_image : ''" alt />
            </div>
            <div class="info">
              <div class="info1">流水号：{{i}}</div>
              <div class="info2">来源： 桌台{{item.table_name}}</div>
              <div class="time">{{item.order_time.substr(10,9)}}</div>
            </div>
            <div class="queren">
              <img src="../../assets/images/queding.png" alt v-if="item.order_status == 3 || item.order_status == 4"/>
              <img src="../../assets/images/finish.png" alt v-else-if="item.order_status == 5"/>
              <img src="../../assets/images/cancel.png" alt v-else-if="item.order_status == 6"/>
            </div>
            <div>￥{{item.order_payment_amount}}</div>
          </li>
        </ul>

        <no-results v-else></no-results>

      </cube-scroll>
    </div>
    <loading v-show="loadShow"></loading>
    <FooterMenu></FooterMenu>
  </cube-page>
</template>
<script>
import { waiterOrder } from "@/api";
import FooterMenu from "@/components/FooterMenu"
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import NoResults from '@/components/noResults'

export default {
  components: {
    FooterMenu: FooterMenu,
    CubePage,
    Loading,
    NoResults
  },
  data() {
    return {
      data: {
        page: 1,
        records: 0,
        total: 0,
        more:true,
        items: []
      },
      tab: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "未结账",
          value: 1
        },
        {
          label: "已结账",
          value: 2
        },
        {
          label: "已作废",
          value: 5
        }
      ],
      order_status: 0,
      options: {
        pullDownRefresh: false,
        pullUpLoad: true
      },
      scrollHeight:'',
      loadShow:true
    };
  },
  methods: {
    getOrderData(data) {
      let params = {
        rows: 10,
        page: this.data.page,
        order_status: this.order_status
      };
      Object.assign(params, data);

      waiterOrder(params).then(res => {
        this.loadShow = false;

        let data = res.data;

        this.data.page = data.page;
        this.data.records = data.records;
        this.data.total = data.total;
        if( this.data.total == this.data.page || this.data.total == 0 ){
          this.data.more = false;
        }
        if( data.page === 1 ){
          this.data.items = data.items;
        } else {
          this.data.items.push.apply(this.data.items,data.items);
        }
        this.data.page++;
      });
    },
    handleTabChange(i) {
      this.data = {
        page: 1,
        records: 0,
        total: 0,
        more:true,
        items: []
      }
      this.order_status = i;
      this.options.pullUpLoad = true;
      this.getOrderData();
    },
    handlePlaceOrderRouter(order_id) {
      return this.$router.push(`/placeOrder/${order_id}`);
    },
    onPullingUp(){
      if( this.data.more ){
        this.getOrderData();
      } else {
        this.options.pullUpLoad = false;
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    this.scrollHeight = viewportHeight - 100;
    this.getOrderData();
  }
};
</script>
<style lang="stylus" scoped>
.order {
  height: 100%;
  background: #fafafa;
  h3 {
    padding: 2rem 1rem 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    background: #fff;
  }

  p {
    color: #585858;
    padding-left: 0.5rem;
    font-size: 12px;
    color: #585858;
    padding: 0 1rem 1rem;
    background: white;
  }

  .tab {
    display: flex;
    font-size: 14px;
    background: white;

    a {
      flex: 1;
      color: #585858;
      text-align: center;
      padding: 0.5rem 0;
    }

    a.active {
      font-weight: 600;
      color: #ffb95c;
      border-bottom: 2px solid #ffb95c;
    }
  }
  .scroll-list-wrap {
    border-radius: 5px;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    position: relative;
  }
  .list {
    margin-top: 5px;
    .item {
      display: flex;
      position: relative;
      padding: 1rem;
      align-items: center;
      background: white;
      border-bottom: 1px solid #eee;

      .leftImg {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        width: 50%;
        color: #585858;
      }

      .status {
        width: 3rem;
        height: 2.5rem;
        margin-right: 1rem;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .info1 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .info2 {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .time {
    font-size: 12px;
  }

  .queren img {
    height: 33px;
    vertical-align: middle;
  }

  .queren {
    width: 15%;
  }
}


</style>
