import Ajax from '../libs/http'
//添加虚拟币
export function add_Coin(payload) {
    return Ajax.post('/webcoin/webcoin/', payload)
};
//查看虚拟币
export function look_Coin(params) {
    return Ajax.get('/webcoin/webcoin/', {params})
};