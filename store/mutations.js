export default {
    setToken(state, str) {
        state.estateToken = str;
        if (str) {
            uni.setStorageSync('estateToken', str);
        } else {
            uni.removeStorageSync('estateToken');
        }
    },
    setUserInfo(state, obj) {
        state.UserInfo = obj;
		if (obj) {
		    uni.setStorageSync('UserInfo', obj);
		} else {
		    uni.removeStorageSync('UserInfo');
		}
    },
	setIsAppShow(state, bl) {
	    state.isAppShow = bl;
	}
}