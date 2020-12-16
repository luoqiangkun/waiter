const state = {
  storage:{
    storeId:0,
    tableId:0,
    orderId : ''
  }
}

const mutations = {
  SET_STORE_ID: (state, storeId) => {
    sessionStorage.setItem("storeId", storeId); //添加到sessionStorage 
    state.storage.storeId = storeId
  },
  SET_TABLE_ID: (state, tableId) => {
    sessionStorage.setItem("tableId", tableId); //添加到sessionStorage 
    state.storage.tableId = tableId
  },
  SET_ORDER_ID: (state, orderId) => {
    sessionStorage.setItem("orderId", orderId); //添加到sessionStorage 
    state.storage.orderId = orderId
  },
  CLEAR_STORE_ID: (state) => {
    state.storage.storeId = 0;
    sessionStorage.removeItem("storeId"); //移除sessionStorage 
  },
  CLEAR_TABLE_ID: (state) => {
    state.storage.tableId = 0;
    sessionStorage.removeItem("tableId"); //移除sessionStorage 
  },
  CLEAR_ORDER_ID: (state) => {
    state.storage.orderId = 0;
    sessionStorage.removeItem("orderId"); //移除sessionStorage 
  }
}

const actions = {
  addStoreId({ commit }, storeId) {
    commit('SET_STORE_ID', storeId)
  },
  addTableId({ commit }, tableId) {
    commit('SET_TABLE_ID', tableId)
  },
  addOrderId({ commit }, orderId) {
    commit('SET_ORDER_ID', orderId)
  },
  clearStoreId({ commit }) {
    commit('CLEAR_ERROR_LOG')
  },
  clearTableId({ commit }) {
    commit('CLEAR_TABLE_ID')
  },
  clearOrderId({ commit }) {
    commit('CLEAR_ORDER_ID')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
