import request from "@/utils/request"
import md5 from 'js-md5';

const { VUE_APP_ENV, VUE_APP_MODE } = process.env;

const Quan2 = {

    key: '/quan2',

    url: 'http://quan2.meiquan8.com',

    getUrl(url) {
        const baseUrl = VUE_APP_ENV === 'h5' && VUE_APP_MODE === 'development' ? this.key : this.url;
        const key = md5('bWFzYlHfSPvPYrw4zpwkD2ZmzmiKUlB8');
        const enUrl = encodeURIComponent('http://cms.luckq.com/');
        return `${baseUrl}/page/cms.php?mod=${url}&key=${key}&url=${enUrl}`;
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

export function getJdGoods(data) {
    return Quan2.get("jd_goods", data)
}