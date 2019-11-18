import Ajax from '../libs/http'
//登录接口
export function POST_LOGIN(payload) {
    return Ajax.post('/users/login/', payload)
};
//发送手机验证码（注册或者密码找回时使用）
export function Get_PhoneCode(phone,params) {
    return Ajax.get('/users/phonecode/'+phone,{params});
}
//注册
export function Post_Signup(payload) {
    return Ajax.post('/users/register/',payload);
}
//修改密码
export function Put_Password(payload) {
    return Ajax.post('/users/update_password/',payload);
}