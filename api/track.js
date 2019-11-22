import Ajax from '../libs/http'
//开启行程共享
export function Track_Share(payload) {
    return Ajax.post('/car/open/', payload)
};
//记录轨迹
export function Record_Track(payload) {
    return Ajax.post('/car/track/?put', payload)
};
//关闭车迹
export function Close_Track(payload) {
    return Ajax.post('/car/open/?put', payload)
};
