import Ajax from '../libs/http'
//查看礼品详情
export function look_GiftDetail(params){
	return Ajax.get('/product/product/',{params})
}
//查看礼品规格
export function look_GiftSpecifications(params){
	return Ajax.get('/product/specifications/',{params})
}
//礼品兑换
//订单查询
//查看礼品分类
export function look_GiftCategory(params){
	return Ajax.get('/product/category/',{params})
}
//按照年度，月度里程排行榜赠送礼物
export function give_Gift(params){
	return Ajax.post('/product/gift/',{params})
}
//查看月度和年度礼品榜
export function get_GiftRank(params){
	return Ajax.get('/product/gift/',{params})
}