module.exports = {
  env: {
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000' || 'http://beastmachine:3000',
    baseUrl: process.env.BASE_URL || 'http://beastmachine:3000',
  },
  css: [
    // node.js module but we specify the pre-processor
    // { src: 'bulma', lang: 'sass' },
    // { src: 'min', lang: 'sass'}
    '~assets/bulma.css',
    // '~assets/entireframework.min.css'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: '%s - mr2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'mr2', name: 'manga-reader2', content: 'Manga Reader 2' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
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
