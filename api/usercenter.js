import Ajax from '../libs/http'
//查看关注
export function searchFollow(params) {
    return Ajax.get('/followfans/followfans/',{params});
}
// 更改头像
export function update_portrait(payload) {
    return Ajax.post('/users/update_portrait/', payload)
};