export function install(Vue, Toast) {
    const TemplateConstructor = Vue.extend(Toast)
    const openModel = (options, callback) => {
        if (typeof options != 'object') options = { title: options }
        const { title, icon, duration = 1500 } = options
        const instance = new TemplateConstructor({
            propsData: {
                title,
                icon
            },
            mounted() {
                this.showPop = true

                if (icon == "loading") return

                setTimeout(() => {
                    this.showPop = false
                    typeof callback == 'function' && callback()
                }, duration)
            }
        }).$mount()

        document.body.appendChild(instance.$el)

        if (icon == "loading") {
            if (Vue.ToastLoadingEls) {
                Vue.ToastLoadingEls.push(instance.$el);
            } else {
                Vue.ToastLoadingEls = [instance.$el]
            }
        } else {
            setTimeout(() => {
                instance.$el.remove()
            }, duration + 1000)
        }
    }

    ['success', 'error', 'loading'].forEach((icon) => {
        openModel[icon] = (title, duration, callback) => openModel({ title, icon, duration }, callback)
    })

    Vue.prototype.$toast = openModel

    Vue.prototype.$hideLoading = () => {
        let els = Vue.ToastLoadingEls
        if (!els || !els.length) return
        els.shift().remove()
    }

    Vue.prototype.$clearLoading = () => {
        let els = Vue.ToastLoadingEls
        if (!els || !els.length) return
        els.forEach(el => el.remove())
        Vue.ToastLoadingEls = []
    }
}