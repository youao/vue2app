import { getSystemOs, objectToStr, objectExtends } from './index.js';

const dft_opt = {
    designWidth: 750,
    baseFontSize: 16,
    needPc: false
};

function getDoms() {
    const d = document;
    return {
        html: d.documentElement,
        body: d.body,
        view: d.querySelector("meta[name=viewport]")
    }
}

function fitPc(baseFontSize) {
    const { html, body, view } = getDoms();
    view.setAttribute("content", "");
    html.style.fontSize = "100px";
    body.style.cssText += objectToStr({
        'font-size': baseFontSize/100 + 'px',
        width: '375px',
        'min-height': '100vh',
        margin: 'auto'
    }, 'style');
}

export default function (options) {
    const { designWidth, baseFontSize, needPc } = objectExtends(dft_opt, options, true);
    if (getSystemOs() == 'pc' && needPc) return fitPc(baseFontSize);
    const { html, body, view } = getDoms();
    let wdpr = window.devicePixelRatio || 2;
    let dpr = (1 / wdpr).toFixed(2);
    view.setAttribute("content", objectToStr({
        'maximum-scale': dpr,
        'minimum-scale': dpr,
        'user-scalable': 0,
        'initial-scale': 1,
        width: 'device-width'
    }, 'content'));
    let rate = window.screen.width ? window.screen.width / designWidth : 1;
    html.style.fontSize = rate * wdpr * 100 + "px";
    body.style.fontSize = designWidth / 375 / 100 * baseFontSize + "rem";
}