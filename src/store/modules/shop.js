import { storeInfo,tableInfo } from '@/api'

const state = {
  shop: {
    storeId:0,
    storeName: '',
    storeLogo: '',
    storeBanner:0 ,
    storeDescription : ''
  },
  table:{
    tableId:0,
    tableName:'',
    tableAction:false
  }
}
const mutations = {
  SET_STORE_ID: (state, store_id) => {
    state.shop.storeId = store_id
  },
  SET_STORE_STATE: (state, storeInfo ) => {
    const { store_id, store_name, store_logo, store_banner,store_description } = storeInfo
    state.shop = {
      storeId:store_id,
      storeName:store_name,
      storeLogo:store_logo,
      storeBanner:store_banner,
      storeDescription:store_description
    }
  },
  SET_TABLE_STATE: (state, tableInfo ) => {
    const { table_id, table_name } = tableInfo
    state.table = {
      tableId:table_id,
      tableName:table_name,
      tableAction : tableInfo.action_id ? true : false
    }
  },
}

const actions = {
  getStoreInfo({ commit }, store_id) {
    return new Promise((resolve, reject) => {
      storeInfo({ store_id: store_id }).then(res => {
       if( res.status == 200 ){
          const { data } = res
          commit('SET_STORE_STATE', data)
         
          resolve( data )
        } else {
          reject('店铺信息有误')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  setStoreInfo({ commit }, storeInfo) {
    commit('SET_STORE_STATE', storeInfo)
  },
  getTableInfo({ commit }, table_id) {
     return new Promise((resolve, reject) => {
      tableInfo({ table_id: table_id }).then(res => {
       if( res.status == 200 ){
          commit('SET_TABLE_STATE', res.data)
          
          resolve( res.data )
        } else {
          reject('桌台信息有误')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  setTableInfo({ commit }, tableInfo) {
    commit('SET_TABLE_STATE', tableInfo)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
