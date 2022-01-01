import storage from '@/utils/storage'
import request from '@/utils/request'

export default {
    state: () => ({
        token: storage.get('token') || '',
        appInfo: storage.get('appInfo')
    }),
    getters: {
        isLogin: state => !!state.token
    },
    mutations: {
        LOGIN(state, token) {
            state.token = token;
            storage.set('token', token);
        },
        UPDATE_APPINFO(state, appInfo) {
            state.appInfo = appInfo;
            storage.set('appInfo', appInfo, {
                type: 'h',
                value: 6
            });
        }
    },
    actions: {
        APPINFO({
            state,
            commit
        }, force) {
            if (state.appInfo && !force) {
                return Promise.resolve(state.appInfo);
            }
            return new Promise(reslove => {
                request.get("api/set", '', {
                    cache: 60
                }).then((res) => {
                    commit("UPDATE_APPINFO", res.r.appinfo);
                    reslove(res.r.appinfo);
                });
            }).catch(() => {

            });
        }
    }
}