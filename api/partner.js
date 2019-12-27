import Ajax from '../libs/http'
//处理搭伴
export function handlePartner(payload) {
    return Ajax.post('/partner/handle/', payload)
};
//创建搭伴
export function createdPartner(payload) {
    return Ajax.post('/partner/partner/', payload)
};
//申请搭伴
export function applyPartner(payload) {
    return Ajax.post('/partner/apply/', payload)
};
//取消搭伴申请
export function removePartner(payload) {
    return Ajax.post('/partner/apply/?delete', payload)
};
//修改搭伴
export function editPartner(payload) {
    return Ajax.post('/partner/partner/?put', payload)
};
//删除搭伴
export function deletePartner(payload) {
    return Ajax.post('/partner/partner/?delete', payload)
};
//查看搭伴详情
export function getPartnerDetail(params){
	return Ajax.get('/partner/partner/',{params})
}