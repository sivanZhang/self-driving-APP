import Ajax from '../libs/http'
//开启车迹
export function Track_Share(payload) {
    return Ajax.post('/car/open/', payload)
};
//记录车迹
export function Record_Track(payload) {
    return Ajax.post('/car/track/?put', payload)
};
//关闭车迹
export function Close_Track(payload) {
    return Ajax.post('/car/open/?put', payload)
};
//返回车迹信息
export function show_Track(payload) {
    return Ajax.post('/car/track/', payload)
};
