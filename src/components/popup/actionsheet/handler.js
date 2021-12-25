import { isArray } from '@/utils/index.js'

export function install(Vue, Actionsheet) {
    const TemplateConstructor = Vue.extend(Actionsheet)
    const openModel = (options, callback) => {
        if (typeof options != 'object') return
        if (isArray(options)) {
            options = { menus: options }
        }
        const instance = new TemplateConstructor({
            propsData: options,
            mounted() {
                this.showPop = true
            },
            methods: {
                onMenuClick(index, item) {
                    typeof callback == 'function' && callback({ index, item })
                    this.close()
                },
                close() {
                    this.showPop = false
                    setTimeout(() => {
                        this.$el.remove()
                    }, 1000)
                }
            }
        }).$mount()

        document.body.appendChild(instance.$el)
    }

    Vue.prototype.$actionsheet = openModel
}