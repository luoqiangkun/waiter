<template>
  <cube-page type="order-remark" title="订单备注">
    <template slot="header">
      <h1>订单备注</h1>
      <i @click="back" class="cubeic-back"></i>
      <span class="action" @click="callback">完成</span>
    </template>
   
    <div slot="content" class="wrapper">
      <cube-textarea v-model="remark" :autofocus="autofocus" placeholder="自定义备注信息"></cube-textarea>
        <ul class="notesUl">
          <li
            v-for="(item,i) in checkBoxData"
            @click="checkItem(item)"
            :key="i"
          >{{item.name}}</li>
        </ul>
        
    </div>
  </cube-page>
  
</template>


<script type="text/ecmascript-6">
  import CubePage from '@/components/page'

  export default {
    name:'OrderRemark',
    components: {
      CubePage
    },
    props: {
      remark: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        autofocus: true,
        checkBoxData: [
          { name: "不要辣", status: false },
          { name: "少放辣", status: false },
          { name: "多放辣", status: false },
          { name: "不要香菜", status: false },
          { name: "不要洋葱", status: false },
          { name: "多点醋", status: false },
          { name: "多点葱", status: false }
        ]
      }
    },
    methods: {
      getLists(){

      },
      checkItem(item) {
        if( this.remark ){
          this.remark += ',' + item.name;
        } else {
          this.remark += item.name;
        }
      },
 
      back(){
        this.$emit('remark-back');
      },
      callback(){
        this.$emit('remark-callback',this.remark);
      }
    },
    created(){
      this.getLists();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order-remark 
  .action 
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc9153;
  .wrapper
    background:#fff;
  .notesUl 
    display: flex;
    flex-wrap: wrap;
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;

    li 
      border: 1px solid #ebebeb;
      padding: 8px 10px;
      text-align: center;
      font-size: 14px;
      margin-right: 8px;
      margin-bottom: 8px;
      color:#666;
      border-radius: 5px;
    .checkActive 
      background: #fc9153;
      color: #fff;
      border: 1px solid transparent;
      text-align: center;
    
  .cube-textarea-wrapper {
    width: 95%;
    margin: 10px auto;
    height: 100px;
  }

</style>
