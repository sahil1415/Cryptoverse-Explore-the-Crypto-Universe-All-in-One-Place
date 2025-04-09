import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { coinId, coinHistory } from '../features/coinSlice';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import millify from 'millify';
import '../static/CryptoDetails.css';
import LineChart from './LineChart';
import {LoadingAndError} from '../components';

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  console.log("UUID", uuid);
  const [timePeriod, setTimePeriod] = useState('24h');
  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const { coinDetails, isLoading: coinDetailLoading, isError: coinDetailError } = useSelector((state) => state.coin);
  const { coinHistoryDetails, isLoading: coinHistoryLoading, isError: coinHistoryError } = useSelector((state) => state.coin);

  useEffect(() => {
    if(uuid){
      dispatch(coinId(uuid));
      dispatch(coinHistory({uuid, timePeriod}));
    }
  }, [uuid, timePeriod, dispatch]);

  const currentCoin = coinDetails?.data?.coin;
  console.log(currentCoin);
  console.log(coinDetails);
  console.log(coinHistoryDetails);


  if (isLoading || isError) {
    return <LoadingAndError isLoading={isLoading} isError={isError}/>;
  }

  return (
    <div className="crypto-details-container">
      {currentCoin ? (
        <>
          <div className="main-heading">
            <h2 className="coin-name-details">
              {currentCoin.name} ({currentCoin.symbol})
            </h2>
            <p className="coin-description">
              {currentCoin.name} live price in USD. View value, statistics, market, and supply.
            </p>
          </div>

          <div className="dropdown-menu">
            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
              {time.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className='line-chart'>
            <LineChart coinHistory = {coinHistoryDetails} currentPrice = {millify(currentCoin.price)} coinName = {currentCoin.name}/>
          </div>

          <div className="stats-container">
            <div className="coin-stats">
              <h2>{currentCoin.name} Value Statistics</h2>
              <div className='para'>
                <p><DollarCircleOutlined /> Price to USD</p>
                <p>{millify(currentCoin.price)}</p>
              </div>
              <div className='para'>
                <p><NumberOutlined /> Rank</p>
                <p>{currentCoin.rank}</p>
              </div>
              <div className='para'>
                <p><ThunderboltOutlined /> 24h Volume</p>
                <p>{millify(currentCoin['24hVolume'])}</p>
              </div>
              <div className='para'>
                <p><DollarCircleOutlined /> Market Cap</p>
                <p>{millify(currentCoin.marketCap)}</p>
              </div>
              <div className='para'>
                <p><TrophyOutlined /> All-time-high (daily avg.)</p>
                <p>{millify(currentCoin?.allTimeHigh?.price)}</p>
              </div>
            </div>

            <div className="other-stats">
              <h2>Other Statistics</h2>
              <div className='para'>
                <p><FundOutlined /> Number Of Markets</p>
                <p>{currentCoin.numberOfMarkets}</p>
              </div>
              <div className='para'>
                <p><MoneyCollectOutlined /> Number Of Exchanges</p>
                <p>{currentCoin.numberOfExchanges}</p>
              </div>
              <div className='para'>
                <p><ExclamationCircleOutlined />Approved Supply</p>
                <p>{currentCoin?.supply.confirmed ? <CheckOutlined /> : <StopOutlined />}</p>
              </div>
              <div className='para'>
                <p><ExclamationCircleOutlined /> Total Supply</p>
                <p>{millify(currentCoin?.supply.total)}</p>
              </div>
              <div className='para'>
                <p><ExclamationCircleOutlined /> Circulating Supply</p>
                <p>{millify(currentCoin?.supply.circulating)}</p>
              </div>
            </div>
          </div>
          <div className="other-information">
            <h2>What is {currentCoin.name}?</h2>
            <p>{currentCoin.description}</p>
            <h2>Want to learn more?</h2>
            <div className="links-container">
              {currentCoin.links.map((link, index) => (
                <div key={index} className="link-item">
                  <NavLink className = 'specific-coin-links' to={link.url} target="_blank">
                    <div className='links'>
                      <p id='type'>{link.type}</p>
                      <p id = 'name'>{link.name}</p> 
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>

        </>
      ) : (
        <div className="loading">Coin details are not available.</div>
      )}
    </div>
  );
};

export default CryptoDetails;
