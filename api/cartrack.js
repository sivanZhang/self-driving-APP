import Ajax from '../libs/http'
//开启车迹
export function CarTrack_Share(payload) {
    return Ajax.post('/car/open/', payload) 
};
//记录车迹
export function Record_CarTrack(payload) {
    return Ajax.post('/car/track/?put', payload)
};
//关闭车迹
export function Close_CarTrack(payload) {
    return Ajax.post('/car/open/?put', payload)
};
//返回车迹信息
export function Show_CarTrack(params) {
    return Ajax.get('/car/track/', {params})
};
