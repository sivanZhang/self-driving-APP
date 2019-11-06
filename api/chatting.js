import Ajax from '../libs/http'
//创建群组
export function createdChatting(data) {
    return Ajax.post('/chat/chatgroup/',data);
}