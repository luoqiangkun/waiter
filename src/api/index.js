  
import {get,post} from '@/http/http'


/**
 * 登录
 */
export const login = data => post('login',data);


/**
 * 退出
 */
export const logout = data => post('logout',data);

/**
 * 用户信息
 */
export const userInfo = data => get('user/info',data);


/**
 * 店铺信息
 */
export const storeInfo = data => get('store/info',data);

/**
 * 店铺购物车
 */
export const storeCart = data => get('store/cart',data);

/**
 * 店铺信息
 */
export const storeConfig = data => get('store/config',data);

/**
 * 服务员信息
 */
export const waiterInfo = data => get('waiter/info',data);


/**
 * 服务员权限
 */
export const waiterPermission = data => get('waiter/permission',data);

/**
 * 桌台列表
 */
export const waiterTable = data => get('waiter/table',data);


/**
 * 服务员信息
 */
export const waiterOrder = data => get('waiter/order',data);

/**
 * 获取商品列表
 */
export const goodsLists = data => get('goods/lists',data);

/**
 * 获取商品信息
 */
export const goodsInfo = data => get('goods/info',data);

/**
 * 获取商品分类
 */
export const cateLists = data => get('category/lists',data);


/**
 * 绑定桌台
 */
export const tableActionAdd = data => post('table/action/add',data);


/**
 * 获取桌台列表
 */
export const tableLists = data => get('table/lists',data);

/**
 * 获取桌台详情
 */
export const tableInfo = data => get('table/info',data);


/**
 * 获取桌台详情
 */
export const tableDetail = data => get('table/detail',data);

/**
 * 添加桌台
 */
export const tableAdd = data => post('table/add',data);


/**
 * 编辑桌台
 */
export const tableEdit = data => post('table/edit',data);


/**
 * 删除桌台
 */
export const tableDelete = data => post('table/delete',data);

/**
 * 更改桌台状态
 */
export const tableState = data => post('table/state',data);

/**
 * 更改桌台状态
 */
export const tableContent = data => post('table/content',data);

/**
 * 获取桌台类型列表
 */
export const tableTypeLists = data => get('table/type/lists',data);

/**
 * 添加桌台类型
 */
export const tableTypeAdd = data => post('table/type/add',data);


/**
 * 编辑桌台类型
 */
export const tableTypeEdit = data => post('table/type/edit',data);


/**
 * 删除桌台类型
 */
export const tableTypeDelete = data => post('table/type/delete',data);


/**
 * 排队列表
 */
export const queueLists = data => get('queue/lists',data);

/**
 * 排队列表
 */
export const queueInfo = data => get('queue/info',data);


/**
 * 获取服务员列表
 */
export const waiterLists = data => get('waiter/lists',data);


/**
 * 购物车列表
 */
export const cartLists = data => post('cart/lists',data);


/**
 * 添加购物车
 */
export const cartAdd = data => post('cart/add',data);


/**
 * 编辑购物车
 */
export const cartEdit = data => post('cart/edit',data);

/**
 * 删除购物车
 */
export const cartDelete = data => post('cart/delete',data);

/**
 * 清空购物车
 */
export const cartClear = data => post('cart/clear',data);


/**
 * 获取订单列表
 */
export const orderLists = data => get('order/lists',data);


/**
 * 获取订单详情
 */
export const orderInfo = data => get('order/info',data);


/**
 * 获取订单详情
 */
export const orderDetail = data => get('order/detail',data);


/**
 * 确认订单
 */
export const orderConfirm = data => get('order/confirm',data);


/**
 * 添加订单
 */
export const orderAdd = data => post('order/add',data);

/**
 * 更改商品数量
 */
export const changeItemQuantity = data => post('order/change_item',data);


/**
 * 加菜
 */
export const addOrderItem = data => post('order/add_item',data);

/**
 * 减菜
 */
export const deleteOrderItem = data => post('order/delete_item',data);


/**
 * 修改订单金额
 */
export const modifyOrder = data => post('order/modify',data);

/**
 * 修改订单金额
 */
export const modifyOrderStatus = data => post('order/modifyStatus',data);

/**
 * 修改订单金额
 */
export const modifyOrderFee = data => post('order/modifyFee',data);


/**
 * 减菜
 */
export const statusLists = data => post('order/status',data);

/**
 * 支付
 */
export const pay = data => post('pay/pay',data);


/**
 * 搜索首页
 */
export const searchIndex = data => post('search/index',data);

/**
 * 搜索列表
 */
export const searchLists = data => post('search/lists',data);


/**
 * 添加搜索记录
 */
export const searchAdd = data => post('search/add',data);


/**
 * 清除历史记录
 */
export const searchClear = data => post('search/clear',data);
