import { isArray } from '@/utils'

const defaultOptions = {
    alert: {
        title: '提示',
        buttons: [{ text: '确认' }],
    },
    confirm: {
        title: '提示',
        buttons: [{ text: '取消', style: 'color: #999' }, '确认'],
    },
    prompt: {
        title: '提示',
        inputShow: !0,
        buttons: [{ text: '取消', style: 'color: #999' }, { text: '确认', verify: !0 }],
    }
}

export function transButtons(buttons) {
    if (typeof buttons == 'string') {
        buttons = buttons.split(',')
    }
    if (!buttons || !isArray(buttons)) return []
    for (let i = 0, count = Math.min(2, buttons.length); i < count; i++) {
        if (typeof buttons[i] != 'object') {
            buttons[i] = { text: buttons[i] }
        }
    }
    return buttons
}

export function getAlertOptions(options, mode) {
    if (typeof options != 'object') options = { content: options }
    if (defaultOptions[mode]) {
        options = {
            ...defaultOptions[mode],
            ...options
        }
    }
    options.buttons = transButtons(options.buttons)
    return options
}

export function install(Vue, Dialog) {
    const TemplateConstructor = Vue.extend(Dialog)
    const openModel = (options, callback) => {
        const instance = new TemplateConstructor({
            propsData: options,
            mounted() {
                this.showProp = true
            },
            methods: {
                onButtonClick(index, item) {
                    if (item.verify) {
                        if (!this.value) return
                        if (item.verify.constructor == RegExp && !item.verify.test(this.value)) return
                    }
                    if (!item.manualClose) {
                        this.close()
                    }
                    let data = { index }
                    if (this.inputShow) {
                        data.value = this.value
                    }
                    typeof callback == 'function' && callback({event: 'button-click', data, close: this.close })
                },
                onMaskClick() {
                    if (this.maskClose) {
                        this.close()
                    }
                    typeof callback == 'function' && callback({ event: 'mask-click' })
                },
                close() {
                    this.showProp = false
                    setTimeout(() => {
                        this.$el.remove()
                    }, 1000)
                }
            }
        }).$mount()

        document.body.appendChild(instance.$el)
    }

    Vue.prototype.$alert = (options, callback) => {
        if (!options) return
        openModel(getAlertOptions(options, 'alert'), callback)
    }

    Vue.prototype.$confirm = (options, callback) => {
        if (!options) return
        openModel(getAlertOptions(options, 'confirm'), callback)
    }

    Vue.prototype.$prompt = (options, callback) => {
        if (!options) return
        openModel(getAlertOptions(options, 'prompt'), callback)
    }
}