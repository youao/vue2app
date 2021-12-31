
import { isObject, numToTime } from './index';

const ls = window.localStorage;

export default {

    time() {
        return new Date().getTime();
    },

    get(key) {
        if (!key) return null;
        let o = JSON.parse(ls.getItem(key));
        if (!o || !o.value || !o.expire) return null;
        let t = this.time();
        if (t > o.expire) {
            this.remove(key);
            return null;
        }
        return o.value;
    },

    set(key, value, expire) {
        if (!key) return console.warn("Storage.set: key is not found");
        expire = this.getExpire(expire);
        ls.setItem(key, JSON.stringify({
            value,
            expire
        }));
    },

    getExpire(expire) {
        if (!isObject(expire)) {
            if (expire && !isNaN(expire)) {
                expire = { value: +expire };
            } else {
                expire = { type: 'm', value: 1 };
            }
        }
        return numToTime(expire.value, expire.type);
    },

    remove(key) {
        if (!key) return console.warn("Storage.remove: key is not found");
        ls.removeItem(key);
    },

    clear() {
        ls.clear();
    }
}
