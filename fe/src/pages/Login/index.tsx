import { LockOutlined, UserOutlined  } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'
import './index.css'
import {useNavigate} from "react-router-dom";
import { post, get } from '../../utils/request';

// interface loginprop  {
//   size: number;
//   data: any;
//   initdata: (data: any, totol: number) => void;
// }

const Login: React.FC = () => {
  const nav = useNavigate();

  const res_login = get('/api/login');
  res_login.then((data) => {
    if(data.code === 1) {
      nav('/index/admin');
      return;
    }
  })
  
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const resp = post(JSON.stringify(values), "api/login/sumit");
    resp.then(function(data){
      const item = data;
      const admin = data.admin;
      localStorage.setItem("user",admin.username);
      localStorage.setItem("avatar",admin.Avatar);
      console.log(item);
      if(item.code === 1){
        message.success(item.message);
        nav('../index/admin')
      }
      else {
        message.error(item.message);
      }
    })
  };

  

  return (
    <div className='login'>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
        <div className='login-title'>
          <span >
            登录
          </span>
        </div>
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>

        <div className='button'>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            登  录
            </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login