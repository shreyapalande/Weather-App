import Weather from "./components/Weather"
import React from 'react'
import { useState, useEffect } from "react"
const axios = require('axios')

const api = {
  key: "5cb031d69963aaea82ffdc66f80f63b1",
  base: "http://api.openweathermap.org/data/2.5/"
}

const weatherIcons = {
  Thunderstorm: "wi-thunderstorm",
  Drizzle: "wi-sleet",
  Rain: "wi-storm-showers",
  Snow: "wi-snow",
  Atmosphere: "wi-fog",
  Clear: "wi-day-sunny",
  Clouds: "wi-day-fog"
}

const weatherBgs = {
  Thunderstorm: "thunderstorm-bg",
  Drizzle: "drizzle-bg",
  Rain: "rain-bg",
  Snow: "snow-bg",
  Atmosphere: "atmosphere-bg",
  Clear: "clear-bg",
  Clouds: "clouds-bg"
}

function App() {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [temp, setTemp] = useState('')
  const [max, setMax] = useState('')
  const [min, setMin] = useState('')
  const [description, setDescription] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [weatherBg, setWeatherBg] = useState('')
  
  useEffect(() => {
    getWeather("Mumbai")
  }, [])

  const calcTemp = (temp) => {
    return Math.floor(temp-273.15)
  }

  const getWeatherDisplay = (range) => {
    switch(true) {
      case range >= 200 && range <= 232 :
        setWeatherIcon(weatherIcons.Thunderstorm)
        setWeatherBg(weatherBgs.Thunderstorm)
        break
      case range >= 300 && range <= 321 :
        setWeatherIcon(weatherIcons.Drizzle) 
        setWeatherBg(weatherBgs.Drizzle)
        break
      case range >= 500 && range <= 531 :
        setWeatherIcon(weatherIcons.Rain)
        setWeatherBg(weatherBgs.Rain)
        break
      case range >= 600 && range <= 622 :
        setWeatherIcon(weatherIcons.Snow)
        setWeatherBg(weatherBgs.Snow)
        break
      case range >= 701 && range <= 781 :
        setWeatherIcon(weatherIcons.Atmosphere)
        setWeatherBg(weatherBgs.Atmosphere)
        break
      case range === 800 :
        setWeatherIcon(weatherIcons.Clear)
        setWeatherBg(weatherBgs.Clear)
        break
      case range >= 801 && range <= 804 :
        setWeatherIcon(weatherIcons.Clouds)
        setWeatherBg(weatherBgs.Clouds)
        break
      default :
        setWeatherIcon(weatherIcons.Atmosphere)
        setWeatherBg(weatherBgs.Atmosphere)
    }
  }

  const getWeather = async (location) => {
    axios({
      method: 'get',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api.key}`
    })
    .then(res => {
      setCity(res.data.name)
      setTemp(calcTemp(res.data.main.temp))
      setCountry(res.data.sys.country)
      setMax(calcTemp(res.data.main.temp_max))
      setMin(calcTemp(res.data.main.temp_min))
      setDescription(res.data.weather[0].description)
      getWeatherDisplay(res.data.weather[0].id)
      // console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Weather 
        getWeather={getWeather} 
        city={city}
        country={country} 
        temp={temp} 
        max={max} 
        min={min}
        description={description}
        weatherIcon={weatherIcon} 
        weatherBg={weatherBg} />
    </>
  );
}

export default App;

/* <div>
      <div className='bg-image app'></div>
      <div className="container" >
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='form-group'>
              <input className='search-box' type='search' placeholder='Search' />
            </div>
          </div>
        </div>
        <div className='row content align-items-center'>
          <div className='col-sm-6 col-left'>
            <div className='location'>New York</div>
            <div className='date'>{dateBuilder(new Date())}</div>
            <center className='weather-icon'><BsSearch/></center>
            <center className='weather-type'>Sunny</center>
          </div>
          <div className='col-sm-6 col-right'>
            <h1>23 &deg;C</h1>
            <h3>30 / 15</h3>
          </div>
        </div>
      </div>
    </div> */


    // const dateBuilder = (d) => {
    //   let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"]
    //   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    //   let day = days[d.getDay()]
    //   let date = d.getDate()
    //   let month = months[d.getMonth()]
    //   let year = d.getFullYear()
  
    //   return `${day}, ${date} ${month} ${year}`
    // }