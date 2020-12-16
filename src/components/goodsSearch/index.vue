<template>
  <cube-page type="goods-search" title="商品搜索">
    <template slot="header">
      <i @click="goBack" class="cubeic-back"></i>

      <cube-input v-model="goods_name"></cube-input>
      
      <div class="search-btn" @click="goSearch">搜索</div>
    </template>
   
    <div slot="content" class="wrapper">
      <ul class="ul-wrapper" v-if="goods.length > 0 ">
        <li class="rightLi" :key="index" v-for="(food,index) in goods">
          <div class="rowDiv" @click="callback(food.goods_id)">
            <div class="imgWrapper">
              <img
                alt
                class="img"
                :src="food.goods_image"
              />
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
              </div>
              <div class="price" v-if="food.activity_id && food.activity_type_id == 2">
                <span>￥{{food.activity_item_price}}</span>

                <span class="line-through">￥{{food.item_price}}</span>

              </div>

              <div class="price" v-else>￥{{food.item_price}}</div>
            </div>

          </div>
        </li>
        
      </ul>

      <div class="search-content" v-else>
        <div class="search-block" v-if="hot.length > 0">
          <h4>热门搜索
            
          </h4>
          <div class="search-list">

              <div class="search-ceil"  v-for="item in hot" @click="goKeyword(item)">{{item}}</div>
          </div>
        </div>    

        <div class="search-block" v-if="history.length > 0">
          <h4>
            历史记录
            <i class="cubeic-delete" style="color:#ccc" @click="handleDelete"></i>
          </h4>
          <div class="search-list">
              <div class="search-ceil" v-for="item in history" @click="goKeyword(item.search_keyword)">{{item.search_keyword}}</div>
          </div>
        </div>
      </div>      
    </div>
  </cube-page>
  
</template>


<script type="text/ecmascript-6">
  import CubePage from '@/components/page'
  import { goodsLists,searchIndex,searchAdd,searchClear } from "@/api"

  export default {
    components: {
      CubePage
    },
    props:{
      store_id:'',
      table_id:'',
    },
    data(){
      return {
        goods_name: '',
        goods:[],
        hot:[],
        history:[]
      }
    },
    methods: {
      getGoods(){
        goodsLists({store_id:this.store_id,goods_name:this.goods_name,rows:500,goods_state:1}).then( res => {
          if( res.status === 200 ){
            this.goods = res.data.items;
          }
        })
      },
      getSearch(){
        searchIndex({store_id:this.store_id}).then( res => {
          if( res.data.hot ){
            this.hot = res.data.hot
          }

          if( res.data.history ){
            this.history = res.data.history;
          }
        })
      },
      goSearch(){
        this.getGoods();
      },
      goKeyword( k ){
        this.goods_name = k;
        this.getGoods();
      },
      handleDelete() {
        this.$createDialog({
          type: 'confirm',
          title: '确认要删除历史记录吗？',
          onConfirm: () => {
            searchClear().then( res => {
              if( res.status === 200 ){
                this.history = [];
              }else{
                this.toast = this.$createToast({
                  txt: '操作失败',
                  type: 'txt'
                })
                this.toast.show()
              }
            })
          }
        }).show();
      },
      goBack(){
        this.$emit('search-back');
      },
      callback( goods_id ){
        this.$emit('search-callback',goods_id);
      }
    },
    created(){
      this.getSearch();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goods-search {
  height: 100%;
  .header {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    .cubeic-back {
      position: relative !important;
      color: #666 !important;
    }
    .cube-input {
      margin-left: 0 1rem;
      flex-grow:1;
      .cube-input-field {
        padding:5px;
      }
    }
    .search-btn {
      padding:0 15px;
      font-size:.9rem;
      color:#666;
    }
  }
  
  .search-content {
    padding:.5rem 1rem;
    .search-block {
      font-size:.7rem;
      h4 {
        font-size:1rem;
        height:2.2rem;
        line-height:2.2rem;
        text-align:left;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .search-list {
        display:flex;
        flex-wrap:wrap;
        padding:.3rem 0;
        .search-ceil {
          font-size:.8rem;
          display: inline-block;
          padding: .5rem 1rem;
          border-radius: .1rem;
          margin-right: .5rem;
          margin-bottom:.3rem;
          background:#f5f4f4;
        }
      }
    }
  }
  .ul-wrapper {
    width: 96%;
    margin: 0 auto;
    .rightLi {
      margin-top: 10px;
      .rowDiv {
        background-color: #fff;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;

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
        }
      }
    }
  }
}
  

</style>
