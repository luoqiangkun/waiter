<template>
  <div>
    <h3>订单</h3>
    <p>订单总数：3</p>
    <div class="tab">
      <a
        href="javascript:;"
        v-for="(item,i) in tab"
        :key="i"
        @click="toggle(i)"
        :class="[cur==i? 'active': '']"
      >{{item}}</a>
    </div>
    <ul class="list">
      <li class="item">
        <div class="leftImg">
          <img src="https://www.baidu.com/img/bd_logo1.png?where=super" alt />
        </div>
        <div class="info">
          <div>流水号：3</div>
          <div>来源： 桌台A-03</div>
          <div class="time">19:30:19</div>
        </div>
        <div class="status">
          <img src="../../assets/images/queding.png" alt />
        </div>
        <div>{{cur| aa}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: ["全部", "未结账", "已结账", "已退货", "已作废"],
      cur: 0
    };
  },
  methods: {
    toggle(i) {
      this.cur = i;
    }
  },
  filters:{
      aa:function(data){
          return data+1;
      }
  }
};
</script>
<style lang="stylus" scoped>
.order {
  color: #fafafa;
}
h3 {
  padding: 1rem 0.5rem;
}
p {
  color: #585858;
  padding-left: 0.5rem;
}
.tab {
  display: flex;
  a {
    flex: 1;
    color: #585858;
    text-align: center;
    padding: 0.5rem 0;
  }
  a.active {
    color: #ffb95c;
    border-bottom: 2px solid #ffb95c;
  }
}
.list {
  padding: 0 0.5rem;
  .item {
    display: flex;
    position: relative;
    padding: 0.5rem 0;
    align-items: center;
    &:after {
      content: "";
      width: 100%;
      height: 1px;
      background: #ccc;
      position: absolute;
      bottom: 0;
    }
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
</style>
