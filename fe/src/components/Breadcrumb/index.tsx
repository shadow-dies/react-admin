import { Breadcrumb } from 'antd';
import React from 'react';

interface person {
  name:string;
}

const Bread: React.FC<person> = ({name}) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <a href="./../admin">人员管理</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>{name}</Breadcrumb.Item>
  </Breadcrumb>
);

export default Bread;