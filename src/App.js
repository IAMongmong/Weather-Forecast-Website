import React, { useState } from 'react';
import './App.css';
import formatWeatherData from './formatWeatherData';
import axios from 'axios';
import styles from './styles.module.css';
import FavoriteCities from './FavoriteCities'; // 導入FavoriteCities元件


function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Initialize trigger state

  // New state to track user input for adding a favorite city
  const [newFavoriteCity, setNewFavoriteCity] = useState('');
  
  const getWeather = (cityName) => {
    if (city.trim() === '') {
      alert('請輸入城市名稱');
      return;
    }

    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'ioxNslkzt3j4yXy54D+/LQ==Ug0VUnb0oPu27PaA';

    // Make the API call
    axios
      .get(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
        headers: { 'X-Api-Key': apiKey },
      })
      .then((response) => {
        const result = response.data;
        const formattedWeatherData = formatWeatherData(result, city);
        setWeatherData(formattedWeatherData);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  const getWeather2 = (cityName) => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'ioxNslkzt3j4yXy54D+/LQ==Ug0VUnb0oPu27PaA';

    // Make the API call
    axios
      .get(`https://api.api-ninjas.com/v1/weather?city=${cityName}`, {
        headers: { 'X-Api-Key': apiKey },
      })
      .then((response) => {
        const result = response.data;
        const formattedWeatherData = formatWeatherData(result, cityName);
        setWeatherData(formattedWeatherData);
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };
  document.title = '天氣查詢';

  // Function to handle adding a favorite city
  const addFavoriteCity = () => {
    if (newFavoriteCity.trim() === '') {
      alert('請輸入城市名稱');
      return;
    }

    // Make a POST request to your API to add the newFavoriteCity
    axios
      .post(`http://127.0.0.1:8000/favorite/post/?city=${newFavoriteCity}`)
      .then((response) => {
        // Update the favorite cities list if needed
        // You can fetch the updated list here or use state management like Redux
        // Example: fetchUpdatedFavoriteCities();
        setRefreshTrigger((prevTrigger) => prevTrigger + 1);
        setNewFavoriteCity(''); // Clear the input field after adding
      })
      .catch((error) => {
        console.error('Error adding favorite city:', error);
      });
  };


  return (
    <div className={styles.appContainer}>
      <div className={styles.favoriteCitiesContainer}>
      <FavoriteCities refreshTrigger={refreshTrigger} getWeather={getWeather2} />
      </div>

      <div className={styles.weatherContainer}>
        <h1>天氣查詢</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="輸入城市"
        />
        <button onClick={getWeather} className={styles.button}>
          查詢
        </button>

        {/* Form to add a favorite city */}
        <div className={styles.addFavoriteCity}>
          <input
            type="text"
            value={newFavoriteCity}
            onChange={(e) => setNewFavoriteCity(e.target.value)}
            placeholder="輸入最愛城市"
          />
          <button onClick={addFavoriteCity} className={styles.button}>
            新增最愛城市
          </button>
        </div>

        <div id="weather" className={styles.weather}>
          {weatherData}
        </div>
      </div>
    </div>
  );
}

export default App;
