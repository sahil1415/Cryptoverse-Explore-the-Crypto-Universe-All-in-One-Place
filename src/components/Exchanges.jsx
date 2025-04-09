import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exchangeData } from '../features/exchangeSlice';
import '../static/Exchange.css';
import millify from 'millify';
import { NavLink } from 'react-router-dom'
import {LoadingAndError} from '../components'

const ExchangeList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, data, errorMessage } = useSelector((state) => state.exchange);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    dispatch(exchangeData());
  }, [dispatch]);

  console.log('Component rendered - Loading:', isLoading, 'Error:', isError, 'Data:', data);

  if (isLoading || isError) {
    return <LoadingAndError isLoading={isLoading} isError={isError}/>;
  }

  const handleToggle = (index) => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  }

  return (
    <>
      <div className="main-heading">
        <h1>Top 100 Coin Exchanges In The World</h1>
      </div>
      <div className="exchange-container">
        {/* Column Names */}
        <div className="column-name">
          <p>Name</p>
          <p>Rank</p>
          <p>Year</p>
          <p>Country</p>
          <p>Total Volume 24h</p>
        </div>
        <div className="exchange-list">
          {/* Render a list of exchanges */}
          {data.map((exchange, index) => (
            <div className="exchange-item" key={exchange.id}>
              <div className="exchange-details" onClick={() => handleToggle(index)}>
                <div className="exchange-column">
                  <img src={exchange.image} alt={exchange.name} />
                  {exchange.name}
                </div>
                <div className="exchange-column">{exchange.trust_score_rank}</div>
                <div className="exchange-column">{exchange.year_established}</div>
                <div className="exchange-column">{exchange.country}</div>
                <div className="exchange-column">${millify(exchange.trade_volume_24h_btc)}</div>
              </div>

              {/* Dropdown for showing additional details */}
              <div
                className={`exchange-description ${expandedIndex === index ? 'expanded' : ''}`}
                style={{
                  maxHeight: expandedIndex === index ? '200px' : '0',
                  padding: expandedIndex === index ? '10px' : '0',
                }}
              >
                {expandedIndex === index && (
                  <>
                    <p>{exchange.description || 'No description available.'}</p>
                    <p><NavLink to={exchange.url}>Visit {exchange.name}</NavLink></p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExchangeList;
