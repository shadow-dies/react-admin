const router = require('koa-router')()

async function getadmin(ctx, next) {
  if (ctx.session.isLogin) {
    ctx.body = {code: 1, message: "用户信息", admin:ctx.session.user}
  } else {
    ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    return;
}

await next();
}

router.get('/getadmin',getadmin)
router.get('/index/getadmin',getadmin)

module.exports = router