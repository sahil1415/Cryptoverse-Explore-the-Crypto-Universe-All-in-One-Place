import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { newsData } from '../features/newsSlice';
import '../static/News.css';
import {LoadingAndError} from '../components'

const News = ({simplified}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const {data, isLoading, isError } = useSelector((state) => state.news);
  const count = simplified ? 12 : 100;

  useEffect(() => {
    dispatch(newsData());
  }, [dispatch]);

  console.log("Component - ",data);

  useEffect(() => {
    // Check if data is an object containing the array property "data"
    if (data && Array.isArray(data.data)) {
      const newData = data.data.slice(0, count);
      console.log("newData", newData);
      setFilteredNewsData(newData);
    } else {
      console.log("Data is not an array or doesn't contain data", data);
    }
  }, [data]);
  
  
  console.log("Filtereddata-", filteredNewsData);
  const filteredData = filteredNewsData.filter((news) => 
  news.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='news-container'>
      {(isLoading || isError) && (
        <LoadingAndError isLoading={isLoading} isError={isError} />
      )}
      {(!simplified && !isLoading && !isError) && 
          <input 
          className='crypto-input' 
          placeholder='Cryptocurrency'
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      }
      <div className='news-card-container'>
      {filteredData.map((article, index) => (
        <NavLink className= 'news-link' to={article.url} key={index} target="_blank" rel="noopener noreferrer">
          <div className='news-card'>
            <h2 className='news-headline'>{article.title}</h2>
            {/* Shortened description to avoid cutting off text */}
            <p className='description'>
              {article.description?.length > 150 ? `${article.description.substring(0, 100)}...` : article.description}
            </p>
            <img id= 'news-image' src={article.thumbnail} alt={article.title} />
            <p className='news-date'>{new Date(article.createdAt).toLocaleDateString()}</p> {/* Date formatting */}
          </div>
        </NavLink>
      ))}
      </div>
    </div>
  );
};

export default News;
