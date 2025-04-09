import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import '../static/LineChart.css';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
        <Title level={5} className="price-change blue-text">Change: {coinHistory?.data?.change}%</Title>
        <Title level={5} className="current-price blue-text">Current {coinName} Price: $ {currentPrice}</Title>

        </Col>
      </Row>
      <div className="line-chart">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
