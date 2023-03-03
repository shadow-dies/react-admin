import React, {useState} from 'react';
import './index.css';
import Bread from '../../components/Breadcrumb';
import { useParams } from 'react-router-dom';
import { post } from '../../utils/request';
import { Image } from 'antd';

type Params = {
  key: string;
}

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

const Person: React.FC = () => {
  const Data: DataType = {
    key: "",
    Avatar:"",
    Name: "",
    Major: "",
    Grade:"",
    sex:"",
    Phone:"",
    Mail: "",
  }
  const params = useParams<Params>();
  console.log(params.key);
  const [item,setItem] = useState(Data)
  const res_person = post(JSON.stringify({key: params.key}), '../getperson');
  res_person.then((data) => {
    console.log("res_person:", data);
    if(item.key === ""){
      setItem(data.item);
    }
  })
  return(
    <div className='check'>
      <Bread name={item.Name}></Bread>
      <div className='person'>
        <div className='infomation avatar'>
          <span className='info-title'>头像:</span>
          <Image src={item.Avatar} width={200}></Image>
        </div>
        <div className='infomation name'>
          <span className='info-title'>姓名:</span>
          <span>{item.Name}</span>
        </div>
        <div className='infomation major'>
          <span className='info-title'>专业:</span>
          <span>{item.Major}</span>
        </div>
        <div className='infomation grade'>
          <span className='info-title'>年级:</span>
          <span>{item.Grade}</span>
        </div>
        <div className='infomation sex'>
          <span className='info-title'>性别:</span>
          <span>{item.sex}</span>
        </div>
        <div className='infomation phone'>
          <span className='info-title'>电话:</span>
          <span>{item.Phone}</span>
        </div><div className='infomation mail'>
          <span className='info-title'>邮箱:</span>
          <span>{item.Mail}</span>
        </div>
      </div>
    </div>
    )
};

export default Person;