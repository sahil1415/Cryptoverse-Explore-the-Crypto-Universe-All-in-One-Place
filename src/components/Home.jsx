import React, { useEffect } from 'react';
import '../static/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { coinData } from '../features/coinSlice';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { NavLink } from 'react-router-dom';
import { CryptoCurrencies, News, LoadingAndError } from '../components'

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.coin);

  useEffect(() => {
    if(!data){
      dispatch(coinData());
    }
  }, []);

  if (isLoading || isError) {
    return <LoadingAndError isLoading={isLoading} isError={isError}/>;
  }

  const globalStats = data?.data?.stats;
  return (
    <div className='home-container'>
      <div className='crypto-stats'>
        <div className='top-header'>
          <Title level={2} className='heading'>Global Crypto Stats</Title>
        </div>
        <Row gutter={16}>
          <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats?.totalCoins} /></Col>
          <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)} /></Col>
          <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)} /></Col>
          <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)} /></Col>
          <Col span={12}><Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)} /></Col>
        </Row>
      </div>
      <div className='top10-crypto'>
        <div className='top-header'>
          <Title level={2} className='Cryptocurrencies'>Top 10 Cryptocurrencies in the world</Title>
          <Title level={3} className='show-more'><NavLink to='/cryptocurrencies'>Show more</NavLink></Title>
        </div>
        <CryptoCurrencies simplified />
      </div>
      <div className='latest-news'>
        <div className='top-header'>
          <Title level={2} className='News'>Latest News</Title>
          <Title level={3} className='show-more'><NavLink to='/news'>Show more</NavLink></Title>
        </div>
          <News simplified />
      </div>
    </div>
  );
};

export default Home;
