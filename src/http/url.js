const SITEURL = "https://shop.xunyoutest.com";
const WAPSITEURL = "https://shop.xunyoutest.com/wap";
const APIURL = "https://shop.xunyoutest.com/catering.php";
const VERSION = 'v1'; 
const SYSURL = {

		'user/info':APIURL + '?ctl=Index&met=info&typ=json',

		'store/info' :APIURL + '?ctl=Store_Base&met=info&typ=json',
		'store/cart' :APIURL + '?ctl=Store_Base&met=cart&typ=json',
		'store/config' :APIURL + '?ctl=Store_Config&met=info&typ=json',

		'waiter/info' :APIURL + '?ctl=Store_Waiter&met=info&typ=json',
		'waiter/permission' :APIURL + '?ctl=Store_Waiter&met=permission&typ=json',
		'waiter/lists' :APIURL + '?ctl=Store_Waiter&met=lists&typ=json',

		'goods/lists' :APIURL + '?ctl=Goods_Base&met=lists&typ=json',
		'goods/cate_goods' :APIURL + '?ctl=Goods_Base&met=getCateGoods&typ=json',
		'goods/info' :APIURL + '?ctl=Goods_Base&met=info&typ=json',

		'cart/lists' : APIURL + '?ctl=Cart&met=lists&typ=json',
		'cart/add' : APIURL + '?ctl=Cart&met=add&typ=json',
		'cart/edit' : APIURL + '?ctl=Cart&met=edit&typ=json',
		'cart/delete' : APIURL + '?ctl=Cart&met=remove&typ=json',
		'cart/clear' : APIURL + '?ctl=Cart&met=clear&typ=json',
		
		'order/lists' : APIURL + '?ctl=Order_Base&met=lists&typ=json',
		'order/detail' : APIURL + '?ctl=Order_Base&met=detail&typ=json',
		'order/confirm' : APIURL + '?ctl=Order_Base&met=confirm&typ=json',
		'order/add' : APIURL + '?ctl=Order_Base&met=addOrder&typ=json',
		'order/add_item' : APIURL + '?ctl=Order_Base&met=addItem&typ=json',
		'order/delete_item' : APIURL + '?ctl=Order_Base&met=removeItem&typ=json',
		'order/change_item' : APIURL + '?ctl=Order_Base&met=changeItemQuantity&typ=json',
		'order/status' : APIURL + '?ctl=Order_Base&met=status&typ=json',
		'order/modify' : APIURL + '?ctl=Order_Base&met=modifyOrderAmount&typ=json',
		'order/modifyStatus' : APIURL + '?ctl=Order_Base&met=modifyOrderStatus&typ=json',
		'order/modifyFee' : APIURL + '?ctl=Order_Base&met=modifyOrderFee&typ=json',

		'table/lists' : APIURL + '?ctl=Table_Base&met=lists&typ=json',
		'table/info' : APIURL + '?ctl=Table_Base&met=info&typ=json',
		'table/add' : APIURL + '?ctl=Table_Base&met=add&typ=json',
		'table/edit' : APIURL + '?ctl=Table_Base&met=edit&typ=json',
		'table/delete' : APIURL + '?ctl=Table_Base&met=remove&typ=json',
		'table/detail' : APIURL + '?ctl=Table_Base&met=detail&typ=json',
		'table/state' : APIURL + '?ctl=Table_Base&met=state&typ=json',
		'table/content' : APIURL + '?ctl=Table_Base&met=content&typ=json',
		
		'table/type/lists' : APIURL + '?ctl=Table_Type&met=lists&typ=json',
		'table/type/add' : APIURL + '?ctl=Table_Type&met=add&typ=json',
		'table/type/edit' : APIURL + '?ctl=Table_Type&met=edit&typ=json',
		'table/type/delete' : APIURL + '?ctl=Table_Type&met=remove&typ=json',

		'table/action/add' : APIURL + '?ctl=Table_Action&met=add&typ=json',
		'table/action/check' : APIURL + '?ctl=Table_Action&met=check&typ=json',

		'waiter/lists' : APIURL + '?ctl=Store_Waiter&met=lists&typ=json',
		'waiter/table' : APIURL + '?ctl=Store_Waiter&met=table&typ=json',
		'waiter/order' : APIURL + '?ctl=Store_Waiter&met=order&typ=json',

		'pay/pay' : APIURL + '?ctl=Pay&met=pay&typ=json',
		
		'login':'https://shop.xunyoutest.com/account.php?ctl=Login&met=doLogin&typ=json',
		'logout':APIURL + '?ctl=Login&met=logout&typ=json',
		'register': APIURL + '?ctl=Login&met=register&typ=json',

		'queue/lists' : APIURL + '?ctl=Queue&met=lists&typ=json',
		'queue/info' : APIURL + '?ctl=Queue&met=info&typ=json',

		'search/index' : APIURL + '?ctl=Search_History&met=index&typ=json',
		'search/lists' : APIURL + '?ctl=Search_History&met=lists&typ=json',
		'search/add' : APIURL + '?ctl=Search_History&met=add&typ=json',
		'search/clear' : APIURL + '?ctl=Search_History&met=clear&typ=json',

	}

	export {
		SITEURL,
		WAPSITEURL,
		APIURL,
		VERSION,
		SYSURL
	}