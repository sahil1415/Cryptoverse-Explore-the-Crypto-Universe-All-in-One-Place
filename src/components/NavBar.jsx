import React from 'react'
import { NavLink } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import icon from '../assets/cryptocurrency.png';
import '../static/Navbar.css';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='icon'>
        <Avatar src={icon} />
        <Typography.Text className="navbar-title">Cryptoverse</Typography.Text>
      </div>
      <div className='nav-links'>
        <NavLink to='/'><HomeOutlined /> Home</NavLink>
        <NavLink to='/cryptocurrencies'><MoneyCollectOutlined /> Cryptocurrencies</NavLink>
        <NavLink to='/exchanges'><FundOutlined /> Exchanges</NavLink>
        <NavLink to='/news'><BulbOutlined /> News</NavLink>
        <NavLink to='/about'><InfoCircleOutlined /> About</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
