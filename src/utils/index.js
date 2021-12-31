export function sendEvent(name, data) {
    window.dispatchEvent(new CustomEvent(name, {
        detail: data
    }));
}

export function listenEvent(name, callback) {
    if (!name || typeof callback != 'function') return;
    window.addEventListener(name, (event) => callback(event.detail));
}

export function getSystemOs() {
    const ua = navigator.userAgent.toLowerCase();
    const agents = ['android', 'iphone', 'symbian', 'windows phone', 'ipad', 'ipod'];
    for (var i = 0, count = agents.length; i < count; i++) {
        if (ua.indexOf(agents[i]) > -1) return agents[i];
    }
    return 'pc';
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export function getObjectSize(obj) {
    if (typeof obj != 'object') return 0;
    if (isArray(obj)) return obj.length;
    return Object.keys(obj).length;
}

export function objectToStr(data, options) {
    const dft_opt = {
        start: '', // 起始符
        pre: '', // 前缀连接符
        even: '', // 键值连接符
        suf: '', // 后缀连接符
        end: '' // 结尾符
    };
    if (typeof options == 'string') {
        switch (options) {
            case 'style': options = { pre: ';', even: ':' }; break;
            case 'url': options = { pre: '&', even: '=' }; break;
            case 'content': options = { pre: ',', even: '=' }; break;
        }
    }
    options = isObject(options) ? options : {};
    options = { ...dft_opt, ...options };
    const { start, pre, even, suf, end } = options;
    let str = start;
    for (const key in data) {
        str += pre + key + even + data[key] + suf;
    }
    return str + end;
}

export function objectExtends() {
    if (!arguments.length) return {};
    let is_verify = false;
    let args = [...arguments];
    if (typeof args[args.length - 1] == 'boolean') {
        is_verify = args.pop();
    }
    let target = {};
    for (let source of args) {
        for (let key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key) && !is_verify || (is_verify && source[key])) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

export function numToTime(num, type) {
    const t = new Date().getTime();
    switch (type) {
        case 'ms':
            return t + num;
        case 's':
        case 'second':
            return t + num * 1000;
        case 'i':
        case 'minutes':
            return t + num * 1000 * 60;
        case 'h':
        case 'hour':
            return t + num * 1000 * 60 * 60;
        case 'd':
        case 'day':
            return t + num * 1000 * 60 * 60 * 24;
        case 'w':
        case 'week':
            return t + num * 1000 * 60 * 60 * 24 * 7;
        case 'm':
        case 'month':
            return t + num * 1000 * 60 * 60 * 24 * 30;
        case 'y':
        case 'year':
            return t + num * 1000 * 60 * 60 * 24 * 365;
        default:
            return num;
    }
}