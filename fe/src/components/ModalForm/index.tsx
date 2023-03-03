import { Input, Modal, Form, Select} from 'antd';
import type { FormInstance } from 'antd/es/form';
import React ,{ useEffect, useRef, } from 'react';
import './index.css';

const { Option } = Select;

interface ModalFormProps {
    open: boolean;
    onCancel: () => void;
    name:string;
    data:any;
  }
  const useResetFormOnCloseModal = ({ form, open }: { form: FormInstance; open: boolean }) => {
    const prevOpenRef = useRef<boolean>();
    useEffect(() => {
      prevOpenRef.current = open;
    }, [open]);
    const prevOpen = prevOpenRef.current;
  
    useEffect(() => {
      if (!open && prevOpen) {
        form.resetFields();
      }
    }, [form, prevOpen, open]);
  };
  
  const ModalForm: React.FC<ModalFormProps> = ({ open, onCancel, name, data }) => {
    const [form] = Form.useForm();
  
    useResetFormOnCloseModal({
      form,
      open,
    });
  
    const onOk = () => {
      form.submit();
    };
  
    return (
      <Modal title = '编辑用户' open = {open} onOk={onOk} onCancel={onCancel} >
        <Form form={form} layout="vertical" name={name} >
          <Form.Item name="Name" label="姓名" rules={[{ required: true, message:"请输入姓名" }]} initialValue = {data.Name}>
            <Input />
          </Form.Item>
          <Form.Item name="Major" label="专业" rules={[{ required: true, message:"请输入专业" }]} initialValue={data.Major}>
            <Input/>
          </Form.Item>
          <Form.Item name="Grade" label="年级" rules={[{ required: true, message:"请输入年级" }]} initialValue={data.Grade}>
            <Input/>
          </Form.Item>
          <Form.Item name="sex" label="性别" rules={[{ required: true, message:"请选择性别" }]} initialValue={data.sex}>
            <Select placeholder="select your gender">
              <Option value="女">女</Option>
              <Option value="男">男</Option>
            </Select>
          </Form.Item>
          <Form.Item name="Phone" label="电话" rules={[{ required: true, message:"请输入电话" }]} initialValue={data.Phone}>
            <Input/>
          </Form.Item>
          <Form.Item name="Mail" label="邮箱" rules={[
            {
            type: 'email',
            message: '请输入正确的邮箱',
            },
            {
              required: true, 
              message:"请输入邮箱" 
            }]} 
            initialValue={data.Mail}>
            <Input/>
          </Form.Item>
          <Form.Item name="Avatar" label="头像" rules={[{ required: true, message:"请输入头像" }]} initialValue={data.Avatar}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  export default ModalForm;