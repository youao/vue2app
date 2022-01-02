const { VUE_APP_ENV } = process.env;
const fs = require('fs')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

// 配置svg
const configSvgLoader = (config, svg_dir) => {
    if (!svg_dir) return
    if (!fs.existsSync(svg_dir)) return
    let svgs = fs.readdirSync(svg_dir).filter(item => /\.svg$/.test(item))
    if (!svgs.length) return

    config.module.rule('svg')
        .exclude.add(resolve(svg_dir));
    config.module
        .rule('svg-sprite-loader')
        .test(/\.svg$/)
        .include
        .add(resolve(svg_dir))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
}

module.exports = {
    assetsDir: '',
    outputDir: 'dist/' + VUE_APP_ENV,
    chainWebpack: config => {
        // 配置svg
        configSvgLoader(config, 'src/assets/icon/svg')
    },
    devServer: {
        port: 8090,
        proxy: {
            '/meiquan': {
                target: 'http://app.luckquan.com',
                pathRewrite: {
                    '^/meiquan': ''
                }
            },
            '/quan2': {
                target: 'http://quan2.meiquan8.com',
                pathRewrite: {
                    '^/quan2': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/style/variables.sass"`
            },
            scss: {
                prependData: `@import "~@/assets/style/variables.scss";`
            }
        }
    },
}