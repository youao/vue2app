import storage from '@/utils/storage'
import { getApiSet } from '@/api/meiquan'

export default {
    state: () => ({
        token: storage.get('token') || '',
        appInfo: storage.get('appInfo'),
        userInfo: storage.get('userInfo'),
    }),
    getters: {
        isLogin: state => !!state.token
    },
    mutations: {
        UPDATE_APPINFO(state, appInfo) {
            state.appInfo = appInfo;
            storage.set('appInfo', appInfo, {
                type: 'h',
                value: 6
            });
        },
        LOGIN(state, token) {
            state.token = token;
            storage.set('token', token);
        },
        UPDATE_USERINFO(state, userInfo) {
            state.userInfo = userInfo;
            storage.set('userInfo', userInfo);
        },
    },
    actions: {
        APPINFO({
            state,
            commit
        }, force) {
            if (state.appInfo && !force) {
                return Promise.resolve(state.appInfo);
            }
            return new Promise((reslove, reject) => {
                getApiSet().then((res) => {
                    commit("UPDATE_APPINFO", res.r.appinfo);
                    reslove(res.r.appinfo);
                }).catch((err) => {
                    reject(err);
                });
            })
        }
    }
}