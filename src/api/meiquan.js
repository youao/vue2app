import request from "@/utils/request"

const { VUE_APP_ENV, VUE_APP_MODE } = process.env;

const Meiquan = {

    key: '/meiquan',

    url: 'http://app.luckquan.com',

    getUrl(url) {
        const data = url.split('/');
        const baseUrl = VUE_APP_ENV === 'h5' && VUE_APP_MODE === 'development' ? this.key : this.url;
        return `${baseUrl}/plugin.php?mod=meiquan&act=${data[0]}&fun=${data[1]}`
    },

    get(url, data, options) {
        url = this.getUrl(url);
        return request.get(url, data, options);
    },

    post(url, data, options) {
        url = this.getUrl(url);
        return request.post(url, data, options);
    },
}

export function getApiSet() {
    return Meiquan.get("api/set", '', {
        cache: 60
    })
}

export function getJdSearch(data) {
    return Meiquan.get("jd/search", data)
}
