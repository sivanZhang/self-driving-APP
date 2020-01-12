import Ajax from '../libs/http'
//创建支付
export function Create_Pay(payload) {
    return Ajax.post('/pay/pay/', payload)
};
//支付记录列表
export function Pay_List(params) {
    return Ajax.get('/pay/pay/', {params})
};