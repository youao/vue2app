export default {
    state: () => ({
        token: ''
    }),
    getters: {
        isLogin: state => !!state.token
    },
    mutations: {
        LOGIN(state, token) {
            state.token = token;
        }
    },
    actions: {
    }
}