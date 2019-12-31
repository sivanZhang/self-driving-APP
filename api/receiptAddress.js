import Ajax from '../libs/http'
//查看收货地址
export function Look_Address(params) {
    return Ajax.get('/address/address/', {params})
};
//新建收货地址
export function Create_Address(payload) {
    return Ajax.post('/address/address/', payload)
};
//修改收货地址
export function Put_Address(payload) {
    return Ajax.post('/address/address/?put', payload)
};
//删除收货地址
export function Delete_Address(payload) {
    return Ajax.post('/address/address/?delete', payload)
};