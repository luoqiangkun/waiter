<template>

  <cube-page type="no-header table" title="桌台">
    <div slot="content" class="main">
      <h3>桌台点单</h3>

      <div class="tab">
        <a
          href="javascript:;"
          v-for="(item,i) in tab"
          :key="i"
          @click="handleTabChange(i)"
          :class="[table_state==i? 'active': '']"
        >{{item}}</a>
      </div>
      <ul class="list" v-if="lists.items.length > 0 ">
        <template v-for="(item,i) in lists.items">
          <li
            class="item secondary"
            @click="handleAction(i,item.table_id,item.table_name)"
            v-if="item.table_state == 1"
          >
            <div class="title">桌台号{{item.table_name}}</div>
            <div class="status">
              <img src="../../assets/images/jia.png" alt />
            </div>
            <div class="time">
              <div>0/{{item.table_seats}}</div>
            </div>
          </li>

          <li
            class="item primary"
            @click="handleTableState(i,item.table_id)"
            v-else-if="item.table_state == 3"
          >
            <div class="title">桌台号{{item.table_name}}</div>
            <div class="status">{{item.table_state_name}}</div>
            <div class="time">
              <div>{{substrTime(item.action_time)}}</div>
              <div>{{item.diners_number}}/{{item.table_seats}}</div>
            </div>
          </li>

          <li
            class="item"
            :class="item.order_id ? 'success' : 'danger'"
            @click="goTableData(item)"
            v-else
          >
            <div class="title">桌台号{{item.table_name}}</div>
            <div class="status">{{item.table_state_name}}</div>
            <div class="time">
              <div>{{substrTime(item.action_time)}}</div>
              <div>{{item.diners_number ? item.diners_number : 0}}/{{item.table_seats}}</div>
            </div>
          </li>
        </template>
      </ul>

      <no-results v-else></no-results>

    </div>

    <loading v-show="loadShow"></loading>


    <FooterMenu></FooterMenu>

   
  </cube-page>
</template>
<script>
import FooterMenu from "@/components/FooterMenu"
import CubePage from '@/components/page'
import Loading from '@/components/loading'
import NoResults from '@/components/noResults'
import { mapGetters } from "vuex"

import {
  waiterInfo,
  waiterTable,
  waiterLists,
  tableActionAdd,
  tableState
} from "@/api";

export default {
  components: {
    FooterMenu: FooterMenu,
    CubePage,
    Loading,
    NoResults
  },
  computed: {
    ...mapGetters(["user"])
  },
  data() {
    return {
      selectedLabel: '订单',
      show: false,
      tab: ["全部桌台", "空闲桌台", "占用桌台", "待清桌台"],
      lists: {
        page: 1,
        records: 0,
        total: 0,
        items: []
      },
      waiter: [],
      info: {},
      form: {
        table_id: 0,
        diners_number: "",
        waiter_id: "",
        table_name: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "diners_number",
          props: {
            placeholder: "请输入就餐人数"
          },
          rules: {
            required: true
          }
        },
        {
          type: "select",
          modelKey: "waiter_id",
          props: {
            options: []
          },
          rules: {
            required: false
          }
        }
      ],
      validity: {},
      valid: undefined,
      table_state: 0,
      loadShow:true
    };
  },
  methods: {
    getTable(data) {
      let params = {
        rows: 100,
        page: 1,
        table_state: this.table_state
      };
      Object.assign(params, data);
      waiterTable(params).then(res => {
        this.lists = res.data;
        this.loadShow = false;
      });
    },
    goTableData(item) {
      if (item.order_id) {
        return this.$router.push(`/placeOrder/${item.order_id}`);
      } else {
        return this.$router.push(
          `/home/${this.info.store_id}/${item.table_id}`
        );
      }
    },
    getWaiterInfo() {
      waiterInfo().then(res => {
        this.info = res.data;
      });
    },
    getWaiter(table_id) {
      waiterLists({ table_id: table_id }).then(res => {
        this.waiter = [];
        for (let i in res.data.items) {
          this.waiter.push({
            value: res.data.items[i].user_id,
            text: res.data.items[i].user_name
          });

          this.fields[1].props.options = this.waiter;
        }
      });
    },
    handleChange(item){
      console.log( item );
    },
    handleTabChange(table_state) {
      this.table_state = table_state;
      this.getTable();
    },
    handleAction(index, table_id, table_name) {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: table_name,
        prompt: {
          value: "",
          placeholder: "请输入就餐人数"
        },
        onConfirm: (e, promptValue) => {
          this.form.table_id = table_id;
          this.form.table_name = table_name;
          this.form.diners_number = promptValue;
          this.form.waiter_id = this.user.uid;

          this.handleActionAdd();
        }
      }).show();
      
    },
    handleActionAdd() {
      tableActionAdd(this.form).then(res => {
        if (res.status === 200) {
          return this.$router.push(
            `/home/${this.info.store_id}/${res.data.table_id}`
          );
        } else {
          this.toast = this.$createToast({
            txt: res.msg,
            type: 'txt'
          })
          this.toast.show()
        }
      });
    },
    handleTableState(index, table_id) {
      this.$createDialog({
        type: "confirm",
        title: "提示",
        content: "桌台已清理完毕",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消 ",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          tableState({ table_id: table_id, table_state: 1 }).then(res => {
            if (res.status === 200) {
              this.lists.items[index].table_state = res.data.table_state;
            } else {
              this.toast = this.$createToast({
                txt: res.msg,
                type: 'txt'
              })
              this.toast.show()
            }
          });
        },
        onCancel: () => {}
      }).show();
    },
    substrTime(time) {
      if (time) {
        return time.substr(10, 6);
      }
    },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
      setTimeout(() => {
        // component.hide();
      }, 1000);
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    }
  },
  created() {
    this.getTable();
    this.getWaiterInfo();
  }
};
</script>
<style lang="stylus" scoped>
.table {
  height: 100%;
  background: #fafafa;
  h3 {
    padding: 2rem 1rem 1rem;
    font-size: 1.5rem;
    font-weight: 600;
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
      color: #ffb95c;
      border-bottom: 2px solid #ffb95c;
      font-weight: 600;
    }
  }
  .list {
    justify-content: space-between;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.2rem;
    box-sizing: border-box;
    padding: 0 1rem;

    &:after {
      content: '';
      width: 30%;
    }

    .item {
      border-radius: 0.5rem;
      box-shadow: 0 0 7px 2px #eee;
      width: 30%;
      margin-bottom: 1rem;
      background: white;

      .title {
        padding: 0 5px;
        background-color: red;
        border-radius: 0.5rem 0.5rem 0 0;
        color: #fff;
        font-size: 12px;
        padding: 7px 5px;
      }

      .status {
        text-align: center;
        height: 3.5rem;
        line-height: 3.5rem;
        font-weight: bold;
      }

      .time {
        display: flex;
        justify-content: space-around;
        color: #cccccc;
        padding-bottom: 7px;
        font-size: 10px;
      }
    }

    .item.primary .title {
      background-color: #1f88f0;
    }

    .item.danger .title {
      background-color: #ff3a3a;
    }

    .item.secondary .title {
      background-color: #a0a0a0;
    }

    .item.success .title {
      background-color: #53af50;
    }
  }

  
  .status img {
    height: 30px;
    vertical-align: middle;
  }

  .cube-form {
    border-radius: 0.5rem;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .cube-input {
    border: 1px solid #eeee;
    margin: 20px 29px 0;
    padding-left: 10px;
  }

  .cube-form_standard .cube-select {
    padding-left: 10px;
    border: 1px solid #eee;
    margin: 20px 29px 0;
  }

  .cube-btn {
    margin:20px;
    width: 80%;
    background: #fe7e00;
    border-radius: 2rem;
    padding: 12px 16px;
    box-shadow: 0 5px 10px #ff980075;
  }

  .cuo_p {
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .cuo_p img {
    height: 15px;
    position: absolute;
    top: 14px;
    right: 14px;
  }
}

</style> 

<style lang="stylus">
  .table {
    .cube-center-popup .cube-popup-content {
      width: 80% !important;
      background: #fff;
      border-radius: 8px;
    }
  }
 
</style> 