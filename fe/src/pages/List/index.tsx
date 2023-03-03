import { Table, Tag, Button, Input, Image, Form, message  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import React ,{ useState } from 'react';
import './index.css';
import { post } from '../../utils/request';
import { nanoid } from "nanoid";
import SetBotton from '../../components/SetBotton';
import ModalForm from '../../components/ModalForm';

const { Column } = Table;

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

let Data: DataType[] = [];


const List: React.FC = () => {
  const [listdata, setListdata] = useState(Data);
  const [searchVal,setsearchVal] = useState("");
  const [issearch,setIsSearch] = useState(false);
  const [size,setSize] = useState(0);
  const [page,setPage] = useState(1);

  if(page > (size/5 + 1)) {
    setPage(page-1);
  }

  const resp = post(JSON.stringify({page:page, issearch:issearch, searchVal:searchVal}),"/list/init");
  resp.then((data) =>{
    console.log("res_getlist",data);
    if(size === 0){
      Data = data.list;
      setListdata(Data);
      setSize(data.totol);
    }
  })

  console.log("listdata:",listdata);

  const changePage: PaginationProps['onChange'] = page => {
    console.log("page:",page);
    setPage(page);
    const resp = post(JSON.stringify({page:page, issearch:issearch, searchVal:searchVal}),"/list/init");
    resp.then((data) =>{
      console.log("res_getlist",data);
      Data = data.list;
      setListdata(Data);
      setSize(data.totol);
    })
  };
  
  const changeSearchVal = (e: any) => {
    setsearchVal(e.target.value);
  }

  const [open, setOpen] = useState(false);
  const showUserModal = () => {
    setOpen(true);
  };

  const hideUserModal = () => {
    setOpen(false);
  };

  const searchItem = () => {
    if(searchVal === ""){
      message.warn("请输入要查找的用户名",1);
      return;
    }
    const res_search = post(JSON.stringify({searchVal: searchVal}), '../list/search')
    res_search.then((data) => {
      console.log("res_search:",data);
      if(data.isSearch) {
        Data = data.list;
        setListdata(Data);
        setSize(data.totol);
        setIsSearch(true);
        message.success("查找成功",1);
      } else {
        message.warn("查找用户不存在",1);
      }
      
    })
  }

  const resetList = () => {
    const res_reset = post(JSON.stringify({page:page}),'../list/reset');
    res_reset.then((data) => {
      console.log("reset_res:",data);
      Data = data.list;
      setSize(data.totol);
      setListdata(data.list);
      setIsSearch(false);
    })
  }

  const deleteItem = (Item:DataType, index:number) => {
    const Index = index + page * 5 - 5;
    const res_del = post(JSON.stringify({Item: Item, index: Index, page: page, issearch:issearch, searchVal:searchVal}),'../list/delete');
    res_del.then((data) => {
      console.log("delete_res:",data);
      Data = data.list;
      setListdata(data.list);
      setSize(data.total);
      if(page > (size/5 + 1)) {
        setPage(page-1);
      }
    })
  }

  const updataItem = (Item:DataType, index:number) => {
    const Index = index + page * 5 - 5;
    const res_del = post(JSON.stringify({Item: Item, index: Index, page: page, issearch:issearch, searchVal:searchVal}),'../list/updata');
    res_del.then((data) => {
      console.log("updata_res:",data);
      Data = data.list;
      setListdata(data.list);
    })
  }

  return (
    <>
      <div className='list'>
        <div className='list-header'>
          <div className='add-item header-item'><Button htmlType="button" onClick={showUserModal}><PlusOutlined></PlusOutlined>添加用户</Button></div>
          <div className='search-item header-item'><Input  placeholder='搜索' onChange={changeSearchVal}></Input></div>
          <div className='btn-search header-item'><Button type="primary" onClick={searchItem}>搜索</Button></div>
          <div className='List-reset header-item'><Button onClick={resetList}>重置</Button></div>
        </div>

        <div className='list-items'>
          <Table pagination={{current:page, pageSize:5, total:size, onChange:changePage }} dataSource={listdata}>
            <Column 
              title="头像" 
              dataIndex="Avatar"
              key = "Avatar"
              render = {(Avatar:string) => (
                <>
                  <Image width={100}  src = { Avatar }></Image>
                </>
              )}
            />
            <Column title="姓名" dataIndex="Name" key="Name" />
            <Column title="专业" dataIndex="Major" key="Major" />
            <Column title="年级" dataIndex="Grade" key="Grade" />
            <Column
              title="性别"
              dataIndex="sex"
              key="sex"
              render={(sex: string) => (
                <>
                  <Tag color={sex === "男" ? 'geekblue' : 'red'} key={sex}>
                    {sex}
                  </Tag>
                </>
              )}
            />
            <Column title="电话" dataIndex="Phone" key="Phone" />
            <Column title="邮箱" dataIndex="Mail" key="Mail" />
            <Column
              title = "操作"
              key="action"
              width={70}
              render = {(text, record,index) => (
                <SetBotton record={record} index={index} delItem={deleteItem} updataItem={updataItem}></SetBotton>
              )}
            />
          </Table>
        </div>
      </div>
      <Form.Provider
        onFormFinish={(name, { values }) => {
          if (name === 'register') {
            console.log(values);
            const new_item = {
              key: nanoid(),
              Avatar: values.Avatar,
              Name: values.Name,
              Major: values.Major,
              Grade: values.Grade,
              sex: values.sex,
              Phone: values.Phone,
              Mail: values.Mail,
            }
            const res_add = post(JSON.stringify({newItem:new_item, page:page, issearch:issearch, searchVal:searchVal}),'../list/add');
            res_add.then((data) => {
              Data = data.list;
              setListdata(Data);
              setSize(data.totol);
              if(page > (size/5 + 1)) {
                setPage(page-1);
              }
            })
            setOpen(false);
          }
        }}
      >
        <ModalForm open={open} onCancel={hideUserModal} name={"register"} data={""}  />
      </Form.Provider>
      
    </>
  );
}

export default List;