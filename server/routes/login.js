const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

async function getUserInfo(ctx, next) {

  if (ctx.session.isLogin) {
    ctx.body = {code: 1, message: '已登录'}
  }
  else{
    // ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  await next();
}

async function checkUser(ctx, next) {
  //1.先接收用户提交的数据 2.处理数据。3.回包
  const { username, password } = JSON.parse(ctx.request.body);
  console.log(ctx.request.body)
  console.log(username,password);
  let isCorrect = -1;
  let data = JSON.parse(fs.readFileSync(path.resolve("public/json/admin.json")).toString());
  for (let i = 0; i< data.length; i++){
    if(data[i].username === username){
      if(data[i].password === password){
        isCorrect = i+1;
      }
      else {
        isCorrect = 0;
      }
      break;
    }
    else {
      isCorrect = -1;
    }
  }
  console.log("iscorrect:",isCorrect);
  //todo:check user and pwd is correct
  if (isCorrect > 0) {
    // 写入 koa-session
    ctx.session.isLogin = true;
    ctx.session.user = {username: data[isCorrect-1].username, avatar: data[isCorrect-1].Avatar};
    ctx.body = { code: 1, message: "登录成功", admin: data[isCorrect-1]};
  } else if(isCorrect === 0){
    ctx.body = { code: 0, message: "密码错误" };
  } else {
    ctx.body = { code: -1, message: "用户名不存在"};
  }
  await next();
}

async function logout(ctx, next) {
  if (ctx.session.isLogin) {
    ctx.session =null;//清空session
    ctx.body = { code: 1, message: "登出成功"}
  }
  else{
    // ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    console.log("当前session已失效");
    return;
  }
  await next();
}

router.get('/api/login', getUserInfo)
router.get('/index/api/login', getUserInfo)
router.post('/api/login/sumit', checkUser)
router.get('/api/logout', logout)


module.exports = router
