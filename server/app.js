const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const { koaBody } = require('koa-body'); 

const login = require('./routes/login')
const list = require('./routes/list')
const admin = require('./routes/admin')

app.use(koaBody({
  multipart: true
}))

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(login.routes(), login.allowedMethods())
app.use(list.routes(), list.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())

//session
const Koa_Session = require("koa-session");
const sessionConfig = require("./config/session.js");
const session = Koa_Session(sessionConfig, app);
// 通过任意字符串为基准进行加密算法的字符串  base64
// keys 作用在cookie 的value值时加密后的内容 
app.keys = ['11132467'];
app.use(session);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
