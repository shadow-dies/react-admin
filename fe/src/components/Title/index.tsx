/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {  ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Popover, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { get } from '../../utils/request';

const { confirm } = Modal;



const Title: React.FC = () => {

  const res_admin = get('../getadmin');
  const [username,setusername] = useState("");
  const [avatar, setavatar] = useState("");
  console.log("res_admin:", res_admin)
  res_admin.then((data) => {
    console.log("admin_res:", data);
    console.log(data.admin.username,data.admin.avatar);
    if(username === ""){
      setusername(data.admin.username);
      setavatar(data.admin.avatar);
    }
  })

  const nav = useNavigate();

  const res_login  = get('../api/login');
  res_login.then((data) => {
    if(data.code === -2){
      nav('/login');
      return;
    }
  })

  const showConfirm = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        console.log('确定');
        const res_logout = get('../api/logout');
        res_logout.then((data) => {
          if(data.code === 1){
            nav("/login");
          }
        })
      },
      onCancel() {
        console.log('取消');
      },
    });
  };


  return (
    <div className='menu-title'>
      <div className='title-name'>
        <span>用户管理系统</span>
      </div>
      <div className='username'>
        <span>{username}</span>
      </div>
      <div className='avatar'>
        <Popover className='quit-button' 
          content = {
            <div>
              <a onClick={() => { showConfirm() }}>退出登录</a>
            </div>
          } 
          trigger="hover" >
          <Avatar
            src = { avatar } 
          />
        </Popover>
      </div>
    </div>
  )
};

export default Title