import Ajax from '../libs/http'
//接收聊天
export function Receive_Chatting(params){
	return Ajax.get('/chat/onlinechat/',{params})
}
//发起聊天
export function Created_Chatting(data) {
    return Ajax.post('/chat/onlinechat/',data);
}
//聊天记录查看
export function Look_ChatHistory(params){
	return Ajax.get('/chat/chatrecord/',{params})
}
//聊天记录删除
export function Delete_ChatHistory(data) {
    return Ajax.post('/chat/chatrecord/?delete',data);
}
//创建群组
export function createdGroupsChatting(data) {
    return Ajax.post('/chat/chatgroup/',data);
}
//查看群组
export function LookGroupsChatting(params){
	return Ajax.get('/chat/chatgroup/',{params})
}
//修改群组
export function EditGroupsChatting(data) {
    return Ajax.post('/chat/chatgroup/?put',data);
}
//删除群组
export function DeleteGroupsChatting(data) {
    return Ajax.post('/chat/chatgroup/?delete',data);
}