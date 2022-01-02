import axios from 'axios';
import storage from './storage';
import { objectToStr } from './index';
import md5 from 'js-md5';

const commonOptions = {
    timeout: 30000,
    cache: 1
}

const request = (method, url, data = {}, options = {}) => {
    return new Promise((resolve, reject) => {
        options.method = method;
        options.url = url;
        let cacheKey = '';
        if (method == 'get') {
            if (data) {
                let params = objectToStr(data, 'url');
                if (options.url.indexOf('?') === -1) {
                    params = params.replace(/&/, '?');
                }
                options.url += params;
            }
            if (options.cache) {
                cacheKey = md5(options.url) + "_http_cache";
                const cacheRes = storage.get(cacheKey);
                if (cacheRes) {
                    return resolve(cacheRes);
                }
            }
        } else {
            options.data = data;
        }
        axios(options).then(res => {
            if (res.status != 200) {
                return reject('请求失败！');
            }
            let data = res.data;
            if (!data.s) {
                return reject(data.r);
            }
            if (cacheKey) {
                storage.set(cacheKey, data, { type: 's', value: options.cache });
            }
            return resolve(data)
        }).catch(err => {
            console.log(err);
            return reject('请求出错！');
        })
    })
}

['get', 'post'].forEach(method => {
    request[method] = (url, data, options = {}) => {
        return request(method, url, data, { ...commonOptions, ...options });
    }
})

export default request;