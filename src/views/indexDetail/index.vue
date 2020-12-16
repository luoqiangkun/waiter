<template>
  <goods-detail :goods_id="goods_id" :table_id="table_id" :cart_type="cart_type" @goods-back="goBack" @to-order="goOrder"></goods-detail>
</template>
<script>
import GoodsDetail from '@/components/goodsDetail'
export default {
  components: {
    GoodsDetail
  },
  data() {
    return {
      goods_id:'',
      table_id:'',
      cart_type:1
    }
  },
  methods: {
    goBack( store_id,table_id ){
      this.$router.push(`/home/${store_id}/${table_id}`)
    },
    goOrder(cart_id,order_id){
      if( order_id ){
        this.$router.push(`/confirm/${cart_id}/${order_id}`);
      } else {
        this.$router.push(`/confirm/${cart_id}`);
      }
    }
  },
  created(){
    this.goods_id = this.$route.params.id;
    this.table_id = this.$route.params.table_id;
  
  }
};
</script>
<style lang="stylus" >

</style>