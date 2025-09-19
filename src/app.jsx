import { useState, useEffect } from 'react'
import './app.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=7d2cae4284f54a7a92e150833251809&q=Port-au-Prince&aqi=no`
        )
        
        if (!response.ok) {
          throw new Error('Impossible de récupérer les données météo')
        }
        
        const data = await response.json()
        setWeatherData(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  // Fonction pour obtenir l'heure actuelle formatée
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="weather-app">
        <div className="container">
          <div className="loading">Chargement des données météo...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-app">
        <div className="container">
          <div className="error">Erreur: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="weather-app">
      <div className="container">
        <div className="location-header">
          <h1>Port-au-Prince, HT</h1>
          <div className="current-time">As of {getCurrentTime()} EST</div>
        </div>
        
        <div className="current-temp">
          {weatherData.current.temp_c}°
        </div>
        
        <div className="weather-condition">
          {weatherData.current.condition.text}
        </div>
        
        <div className="high-low">
          Day {weatherData.current.temp_c}° • Night 76°
        </div>
        
        <div className="alert">
          <input type="checkbox" id="alert-check" />
          <label htmlFor="alert-check">RIP CURRENT STATEMENT...</label>
          <span className="more-alerts">+1 MORE</span>
        </div>
        
        <div className="weather-today">
          <h2>Weather Today in Port-au-Prince, HT</h2>
          
          <div className="feels-like">
            <h3>Feels Like</h3>
            <div className="feels-like-temp">{weatherData.current.feelslike_c}°</div>
          </div>
          
          <div className="weather-details">
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">High / Low</span>
                <span className="value">~/76°</span>
              </div>
              <div className="detail-item">
                <span className="label wind-icon">Wind</span>
                <span className="value">{weatherData.current.wind_kph} km/h</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Humidity</span>
                <span className="value">{weatherData.current.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label dew-icon">Dew Point</span>
                <span className="value">74°</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Pressure</span>
                <span className="value">♦ {weatherData.current.pressure_mb} mb</span>
              </div>
              <div className="detail-item">
                <span className="label uv-icon">UV Index</span>
                <span className="value">2 of 11</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="label">Visibility</span>
                <span className="value">{weatherData.current.vis_km} km</span>
              </div>
              <div className="detail-item">
                <span className="label moon-icon">Moon Phase</span>
                <span className="value">Waning Gibbous</span>
              </div>
            </div>
          </div>
          
          <div className="sun-times">
            <div className="sun-time">
              <span className="time-label">6:49 am</span>
              <span className="time-desc">Sunrise</span>
            </div>
            <div className="sun-time">
              <span className="time-label">8:04 pm</span>
              <span className="time-desc">Sunset</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App