import React from 'react';

const formatWeatherData = (data, city) => {
    // Implement your formatting logic here
    // Return the JSX for displaying weather data
    return (
      <div>
        <h2>{city} 當日天氣狀況</h2>
        <p>雲量： {data.cloud_pct}</p>
        <p>體感溫度： {data.feels_like}</p>
        <p>濕度： {data.humidity}%</p>
        <p>最高溫度： {data.max_temp}°C</p>
        <p>最低溫度： {data.min_temp}°C</p>
        <p>日出時間： {new Date(data.sunrise * 1000).toLocaleTimeString()}</p>
        <p>日落時間： {new Date(data.sunset * 1000).toLocaleTimeString()}</p>
        <p>溫度： {data.temp}°C</p>
        <p>風向： {data.wind_degrees}°</p>
        <p>風速： {data.wind_speed} km/h</p>
    </div>
    );
  };

export default formatWeatherData;