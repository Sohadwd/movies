const APIV1 = 'https://api.themoviedb.org/3'
const KEY = '2104aaa20677afc6b7f180c98d62acbd'

module.exports = {
  name: 'Popular Movie',
  prefix: 'movie',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [APIV1],
  openPages: [''],
  apiPrefix: '/api/v1',
  APIV1,
  KEY,
  api: {
    video: `${APIV1}/movie/popular?api_key=2104aaa20677afc6b7f180c98d62acbd`,
    details: `${APIV1}/movie`,
    fav: `${APIV1}/account`,
  },
}
