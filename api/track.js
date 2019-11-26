import Ajax from '../libs/http'
//里程排行榜
export function Track_Rank(payload) {
    return Ajax.get('/track/rank/', payload)
};
//开启行程共享
export function Track_Share(payload) {
    return Ajax.post('/track/share/', payload)
};
//行程共享修改
export function Put_Track(payload) {
    return Ajax.post('/track/share/?put', payload)
};
//记录轨迹
export function Record_Track(payload) {
    return Ajax.post('/track/track/?put', payload)
};
//返回轨迹信息
export function Show_Track(payload) {
    return Ajax.get('/track/track/', payload)
};

