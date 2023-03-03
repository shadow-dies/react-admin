/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popover, Button,  Modal, Form } from 'antd';
import {  SettingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React ,{ useState } from 'react';
import './index.css';
import ModalForm from '../ModalForm';

interface DataType {
    key: React.Key;
    Avatar:string;
    Name: string;
    Major: string;
    Grade:string;
    sex:string;
    Phone:string;
    Mail: string;
  }

interface detail {
  record: any;
  index: number;
  delItem: (Item: DataType, index: number) => void;
  updataItem: (Item: DataType, index: number) => void;
}

const SetBotton: React.FC<detail> = ({record, index, delItem, updataItem}) => {
//   console.log("setbotton",record,index)
  const { confirm } = Modal;
  const showPromiseConfirm = () => {
    confirm({
    title: '提示',
    icon: <ExclamationCircleOutlined />,
    okText: '确认',
    cancelText: '取消',
    content: '确定要删除用户吗',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          resolve(delItem(record,index))
        });
      } catch {
          return console.log('Oops errors!');
      }
  },
    onCancel() {},
        });
  };

  const [open, setOpen] = useState(false);
  const showUserModal = () => {
    setOpen(true);
  };

  const hideUserModal = () => {
    setOpen(false);
  };
  const content = (
    <div className='item-action'>
      <a href={'./person/'+ record.key} >查看</a>
      <a onClick={showUserModal}>编辑</a>
      <a onClick={showPromiseConfirm}>删除</a>
    </div>
  )
  return (
  <>
    <Popover placement="bottom" content={content} trigger="click">
      <Button 
        icon = {<SettingOutlined />}>
      </Button>
    </Popover>
    <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === 'updata') {
            console.log("updata:",values);
            const new_item = {
              key: record.key,
              Avatar: values.Avatar,
              Name: values.Name,
              Major: values.Major,
              Grade: values.Grade,
              sex: values.sex,
              Phone: values.Phone,
              Mail: values.Mail,
            }
            updataItem(new_item, index);
            setOpen(false);
          }
        }}
      >
        <ModalForm open={open} onCancel={hideUserModal} name={"updata"} data = {record} />
      </Form.Provider>
  </>)
}

export default SetBotton;