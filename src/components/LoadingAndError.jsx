import React from 'react'
import '../static/LoadingAndError.css'

const LoadingAndError = ({ isLoading, isError }) => {
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading data, please wait...</p>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <p>Oops! Something went wrong while fetching data.</p>
            </div>
        );
    }

    return null;
}

export default LoadingAndError
