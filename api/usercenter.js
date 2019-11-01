import Ajax from '../libs/http'
//查看关注
export function searchFollow(params) {
    return Ajax.get('/followfans/followfans/',{params});
}