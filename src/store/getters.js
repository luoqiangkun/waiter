const getters = {
  user:state => state.user.user,
  shop:state => state.shop.shop,
  table:state => state.shop.table,
  orderData: state => state.order.orderData,
  errorLogs: state => state.errorLog.logs,
  store_id:state => sessionStorage.getItem('storeId'),
  table_id:state => sessionStorage.getItem('tableId'),
  order_id:state => sessionStorage.getItem('orderId'),
}
export default getters
