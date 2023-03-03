import "./index.css"
import { Divider } from 'antd';
import React from 'react';

const About = () => {
  return <>
    <div className="about">
      <Divider>项目设计</Divider>
      <p className="tips">
        项目分为两个主页面，登陆页面和系统页面。系统页面由顶部的页头，左边的菜单和主页面构成，
        主页面根据当前路由的不同展示不同的内容。
      </p>
      <p className="tips">
        客户端通过fetch向服务端发起请求，根据请求回来的数据渲染页面。
      </p>
      
      <p className="tips">
        列表内容在后端分页，每次只接收5个用户的内容，切换页码时再向服务端请求，服务端回把用户总数
        返回用于分页器初始化
      </p>
      <p className="tips">
        项目通过session保存管理者的名字和头像，同时起到了确认是否登录的作用
      </p>
      <p className="tips">
        列表数据以json文件的格式存储再服务端的public/json中，通过fs模块读取
      </p>
      <p className="tips">
        
      </p>
      <Divider>亮点</Divider>
      <p className="tips">
        登录成功后不需要再通过登录界面，能直接跳转到系统界面，未登录访问系统界面回跳转到登录界面。
      </p>
      <p className="tips">
        列表的操作都会基于当前获得的界面进行，能直接观察到列表的变化，比如在搜索后再添加内容，
        页面会再当前搜索的页面添加，重置后才变回完整列表。
      </p>
      <p className="tips">
        每个用户对应一个独一无二的ID，可支持重名。
      </p>
      <p className="tips">
        分页器会根据当前总数调整最大页数，同时如果当前页只有一个用户，将此用户删除后页面自动跳转到上一页。
      </p>
    </div>
  </>
}

export default About;

