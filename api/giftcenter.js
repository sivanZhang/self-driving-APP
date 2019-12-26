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