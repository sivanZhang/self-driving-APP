const state = {
    Redirect: ""
}
const mutations = {
    SetRedirect(state, str) {
        state.Redirect = str
    }
}
export default {
    namespaced: true,
    state,
    mutations
}