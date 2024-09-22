import { useState } from 'react';
import './App.css';
import axios from 'axios';
// import { getWeatherByTown } from './apiService/weather';

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const key = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

  const searchWeather = event => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        console.log(response);
        setData(response.data)
      })
      setTown('');
    }
  };

  return (
    <div className='app'>
      <div className="inp-field">
        <input
          type="text"
          value={town}
          onChange={event => setTown(event.target.value)}
          placeholder="Enter location"
          onKeyDown={searchWeather}
        />
      </div>

      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>

        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()} &deg;C</h1> : null}
        </div>
        <div className="descr">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} &deg;C</p>
              ) : null}
              <p>Відчувається як</p>
            </div>

            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Вологість</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} м/с</p> : null}
              <p>Вітер</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
