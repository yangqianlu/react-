
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  if (process.env.P_ENV === 'dev') {

    // app.use(proxy('/api',
    //     { target: 'http://192.168.1.174:7301/mock/5cc13d6c487a5641daa93e22', changeOrigin: true }
    // ));
    app.use(proxy('/api',
      { target: 'https://www.easy-mock.com/mock/5cb5513f9e76301b0a3ac501/', changeOrigin: true }
    ));
  } else if (process.env.P_ENV === 'test') {
    app.use(proxy('/api', { target: 'https://bot.testing2.ifchange.com/', changeOrigin: true }))
  } else if (process.env.P_ENV === 'pro') {
    app.use(proxy('/api', { target: 'https://bot.ifchange.com', changeOrigin: true }))
  }
}
