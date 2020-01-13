import Ajax from '../libs/http'
//查看礼品详情
export function look_GiftDetail(params){
	return Ajax.get('/product/product/',{params})
}
//查看礼品规格
export function look_GiftSpecifications(params){
	return Ajax.get('/product/specifications/',{params})
}
//添加订单
export function Create_Order(payload){
	return Ajax.post('/product/bill/',payload)
}
//查看订单详情
export function Look_Order(params){
	return Ajax.get('/product/bill/',{params})
}
//更新快递信息
export function Update_Logistics(params){
	return Ajax.get('/product/bill/',{params})
}
//查看礼品分类
export function look_GiftCategory(params){
	return Ajax.get('/product/category/',{params})
}
//按照年度，月度里程排行榜赠送礼物
export function give_Gift(payload){
	return Ajax.post('/product/gift/',payload)
}
//查看月度和年度礼品榜
export function get_GiftRank(params){
	return Ajax.get('/product/gift/',{params})
}