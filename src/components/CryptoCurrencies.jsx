import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../static/Cryptocurrencies.css';
import { coinData } from '../features/coinSlice';
import millify from 'millify';
import { NavLink } from 'react-router-dom';
import {LoadingAndError} from '../components'
const CryptoCurrencies = ({ simplified }) => {
  const dispatch = useDispatch();
  const count = simplified ? 12 : 100;
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError } = useSelector((state) => state.coin);
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    if(!data){
      dispatch(coinData());
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchedCoins = data?.data?.coins?.slice(0, count) || [];
    setCoins(fetchedCoins);
    setFilteredCoins(fetchedCoins); 
  }, [data, count]);

  useEffect(() => {
    const result = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(result);
  }, [searchTerm, coins]);

  if (isLoading || isError) {
    return <LoadingAndError isLoading={isLoading} isError={isError}/>;
  }


  return (
    <div className='cryptocurrencies-container'>
      {!simplified && (
        <input
          className='searchbar'
          placeholder='Search'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <div className='card-container'>
        {filteredCoins.map((coin) => (
          <NavLink to={`/cryptoDetails/${coin.uuid}`} className='coin-link' key={coin.uuid}>
            <div className='coin-card'>
              <img className='image' src={coin.iconUrl} alt={`${coin.name} icon`} />
              <p className='coin-name'>Name: {coin.name}</p>
              <p className='coin-rank'>Rank: {coin.rank}</p>
              <p className='coin-price'>Price: {millify(coin.price)}</p>
              <p className='coin-marketcap'>Market Cap: {millify(coin.marketCap)}</p>
              <p className='coin-change'>Daily Change: {millify(coin.change)}%</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
