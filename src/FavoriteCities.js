import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

function FavoriteCities({ refreshTrigger, getWeather }) {
  // 創建一個狀態變數來存儲最愛城市列表
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [trigger, setTrigger] = useState(refreshTrigger); // Initialize with the prop value

  // 使用useEffect來發出API請求並更新列表
  useEffect(() => {
    console.log("trigger changed");
    // 在這裡替換成你的API端點
    fetch('http://127.0.0.1:8000/favorite/get/')
      .then((response) => response.json())
      .then((data) => {
        // 更新最愛城市列表
        setFavoriteCities(data.cities);
      })
      .catch((error) => {
        console.error('API請求失敗:', error);
      });
  }, [refreshTrigger, trigger]); // Include trigger as a dependency

  // 函數來處理刪除城市的操作
  const handleDeleteCity = (cityName) => {
    // 發出刪除城市的API請求
    fetch(`http://127.0.0.1:8000/favorite/delete/${cityName}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // 更新最愛城市列表
        setTrigger((trigger) =>  trigger + 1);
      })
      .catch((error) => {
        console.error('刪除城市失敗:', error);
      });
  };

    // 函數來處理查詢城市的操作
    const handleQueryCity = (cityName) => {
        getWeather(cityName);
    }

  return (
    <div>
      <h2>我的最愛城市列表</h2>
      <ul className={styles.cityList}>
        {favoriteCities.map((city) => (
          <li key={city} className={styles.cityItem}>
            <span>{city}</span>
            <button onClick={() => handleQueryCity(city)}>查詢</button>
            <button onClick={() => handleDeleteCity(city)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteCities;
