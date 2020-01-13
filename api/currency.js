import Ajax from '../libs/http'
//添加虚拟币
export function Add_Coin(payload) {
    return Ajax.post('/webcoin/webcoin/', payload)
};
//查看虚拟币
export function Look_Coin(params) {
    return Ajax.get('/webcoin/webcoin/', {params})
};