import React from 'react'
import MenuList from '../../components/Menu'
import Title from '../../components/Title';
import { Outlet } from 'react-router-dom';

const System: React.FC = () => {
  return(
    <>
      <Title></Title>
      <MenuList></MenuList>
      <Outlet></Outlet>
    </>
  )
};

export default System