const pkg = require('./package')

module.exports = {
  mode: 'universal',

  head: {
    title: 'SSR Blog',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content:'Блог написан Лешей с использование Nuxt SSR' },
      {hid:'keywords',name:'keywords',content:'js, javascript, ssr, blog'}

    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  loading: {color: '#ad8dff'},


  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@theme/index.scss'
  ],

  plugins: [
    '@/plugins/globals',
    '@/plugins/axios'
  ],


  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL:'http://127.0.0.1:3000/'
  },
  env: {
    appName: 'Alex\'s Nuxt Blog'
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  build: {

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
