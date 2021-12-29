import axios from 'axios';

const { VUE_APP_ENV, VUE_APP_MODE, VUE_APP_URL } = process.env;

const commonOptions = {
    timeout: 30000
}

const Meiquan = {
    getUrl: (url) => {
        let baseUrl = VUE_APP_MODE == 'development' ? '/meiquan' : VUE_APP_URL;
        let data = url.split('/');
        return `${baseUrl}/plugin.php?mod=meiquan&act=${data[0]}&fun=${data[1]}`
    }
}

const request = (method, url, data, options = {}) => {
    if (url.indexOf('http') !== 0) {
        url = Meiquan.getUrl(url)
    }
    options.method = method;
    options.url = url;
    if (method == 'get') {
        options.params = data;
    } else {
        options.data = data;
    }
    return new Promise((resolve, reject) => {
        axios(options).then(res => {
            if (res.status != 200) {
                return reject('请求失败！');
            }
            let data = res.data;
            if (!data.s) {
                return reject(data.r);
            }
            return resolve(data.r, data)
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