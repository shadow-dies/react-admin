const router = require('koa-router')()
const json = require('koa-json')
const fs = require('fs')
const path = require('path')

async function getlist(ctx, next) {
  if (ctx.session.isLogin) {
    const data = JSON.parse(ctx.request.body)
    const start = (data.page -1) * 5;
    let end = data.page * 5;
    let list = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
    if(data.issearch) {
      list = list.filter(Item => {return Item.Name === data.searchVal})
    }
    if(end > list.length){
      end = list.length;
    }
    console.log(2,ctx.session.username);
    ctx.body = {code: 1, message: '已登录', username: ctx.session.username,list: list.slice(start,end), totol: list.length}
    
  }
  else{ 
    ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  await next();
}

async function addList(ctx, next) {
  if (ctx.session.isLogin) {
    data = JSON.parse(ctx.request.body);
    let list = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
    let list2 = [...list];
    if(data.issearch) {
      list2 = list2.filter(Item => {return Item.Name === data.searchVal})
    }
    newItem = data.newItem;
    console.log(newItem);
    list.unshift(newItem);
    list2.unshift(newItem);
    fs.writeFileSync("public/json/user.json",JSON.stringify(list));
    const start = (data.page -1) * 5;
    let end = data.page * 5;
    if(end > list2.length){
      end = list2.length;
    }
    ctx.body = {code: 1, message: '添加成功', list:list2.slice(start,end), totol:list2.length};
  } else { 
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  await next();
}

async function search(ctx, next) {
  if (ctx.session.isLogin) {
    const find = JSON.parse(ctx.request.body);
    console.log("find:", find.searchVal);
    const data = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
    const selectData = data.filter(Item => {return Item.Name === find.searchVal})
    if (selectData.length > 0){
      ctx.body = { code: 1, message: '查找成功' , isSearch: true, list: selectData, totol: selectData.length }
    }
    else {
      ctx.body = { code: 0, message: "查找用户不存在, isSearch: false" };
    }
  } else { 
    ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  await next();
}

async function resetlist(ctx, next) {
  const data = JSON.parse(ctx.request.body)
  const start = (data.page -1) * 5;
  let end = data.page * 5;
  const list = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
  if(end > list.length){
    end = list.length;
  }
  ctx.body = { code: 1, message: "重置列表", list: list.slice(start,end), totol:list.length}
  await next();
}

async function getItem(ctx, next) {
  if (ctx.session.isLogin) {
    const data = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
    const find = JSON.parse(ctx.request.body)
    const findItem = data.filter(Item => {return Item.key === find.key})
    if(findItem.length > 0) {
      ctx.body = {code: 1, message: '查找成功', item: findItem[0]};
    } else {
      ctx.body = {code: 0, message: '查找失败'};
    }
    
  } else {
    ctx.status = 403;
    ctx.body = { code: -2, message: "没有登录" };
    return;
  }
  
  await next();
}

async function updata(ctx,next){
  const data = JSON.parse(ctx.request.body)
  let list = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
  let list2 = [...list];
  console.log(data)
  if(data.issearch) {
    list2 = list2.filter(Item => {return Item.Name === data.searchVal})
    console.log("lists",list2);
  }
  for (let i =0 ;i < list.length; i++) {
    if(list[i].key === data.Item.key) {
      list[i] = data.Item;
      break;
    }
  }
  for (let i =0 ;i < list2.length; i++) {
    if(list2[i].key === data.Item.key) {
      list2[i] = data.Item;
      break;
    }
  }
  fs.writeFileSync("public/json/user.json",JSON.stringify(list));
  
  const start = (data.page -1) * 5;
  let end = data.page * 5;
  if(end > list.length){
    end = list.length;
  }
  ctx.body = {code: 1, message: '修改成功', list:list2.slice(start, end), totol:list2.length };

  await next();
}

async function delItem(ctx,next){
  const data = JSON.parse(ctx.request.body)
  let list = JSON.parse(fs.readFileSync(path.resolve("public/json/user.json")));
  let list2 = [...list];
  console.log(data)
  if(data.issearch) {
    list2 = list2.filter(Item => {return Item.Name === data.searchVal})
  }
  for (let i =0 ;i < list.length; i++) {
    if(list[i].key === data.Item.key) {
      list.splice(i,1);
      break;
    }
  }
  for (let i =0 ;i < list2.length; i++) {
    if(list2[i].key === data.Item.key) {
      list2.splice(i,1);
      break;
    }
  }
  fs.writeFileSync("public/json/user.json",JSON.stringify(list));
  
  const start = (data.page -1) * 5;
  let end = data.page * 5;
  if(end > list.length){
    end = list.length;
  }
  ctx.body = {code: 1, message: '删除成功', list:list2.slice(start, end), totol:list2.length };

  await next();
}

router.post('/list/init', getlist)
router.post('/list/add',addList)
router.post('/list/search',search)
router.post('/list/reset', resetlist)
router.post('/index/getperson', getItem)
router.post('/list/updata', updata)
router.post('/list/delete', delItem)

module.exports = router
