import React from 'react';
import { GithubOutlined, LinkedinOutlined, GoogleOutlined } from '@ant-design/icons';
import '../static/About.css'

const About = () => {
    return (
        <div className='about'>
            <div className='about-container'>
            <div className='intro'>
                <h1>Cryptoverse</h1>
                <p>
                    Cryptoverse is a cutting-edge platform dedicated to providing real-time
                    and accurate information about the world of cryptocurrencies. Whether you're
                    an investor, enthusiast, or just curious, we bring you the latest updates on
                    cryptocurrencies, exchanges, market trends, and news that shape the industry.
                </p>
            </div>

            <div className='mission'>
                <h2>Our Mission</h2>
                <p>
                    At Cryptoverse, our mission is to make cryptocurrency accessible,
                    understandable, and usable for everyone. We strive to simplify the
                    complex world of digital currencies and blockchain technology,
                    offering insightful data and tools to help users make informed
                    decisions.
                </p>
            </div>

            <div className='who'>
                <h2>Who We Are</h2>
                <p>
                    Cryptoverse is powered by a passionate team of crypto enthusiasts,
                    developers, and experts who believe in the potential of blockchain
                    technology to revolutionize the financial world. We are dedicated to
                    creating an easy-to-use platform where people can learn about and track
                    their favorite cryptocurrencies, explore the latest news, and stay ahead
                    of the market.
                </p>
            </div>

            <div className='we'>
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Real-Time Data: Get up-to-date information on cryptocurrency prices, exchange rates, and market trends.</li>
                    <li>Comprehensive Tools: Access the latest news, research, and analysis to guide your decisions in the crypto space.</li>
                    <li>User-Focused: Whether you're just starting or you're an experienced trader, Cryptoverse offers a user-friendly interface for all levels of expertise.</li>
                    <li>Trustworthy: Our platform aggregates data from reputable sources and strives to provide information you can rely on.</li>
                </ul>
            </div>

            <div className='contact'>
                <h2>Contact Us</h2>
                <p>Have questions or suggestions? Reach out to us at:</p>
                <div className='icons'>
                    <a href='https://github.com/sahil1415' target='_blank' rel='noreferrer'><GithubOutlined /></a>
                    <a href='https://www.linkedin.com/in/sahil-ansari-bba31724a/' target='_blank' rel='noreferrer'><LinkedinOutlined /></a>
                    <a href='mailto:sahilansari37863@gmail.com'><GoogleOutlined /></a>
                </div>
            </div>
            </div>
        </div>
    );
};
export default About;
