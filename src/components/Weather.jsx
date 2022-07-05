import React from 'react'
import 'weather-icons/css/weather-icons.css';
import {BsSearch} from "react-icons/bs";
import { useState } from 'react';

function Weather(props) {
    const [location, setLocation] = useState('')
    
    const getWeather = (e) => {
        e.preventDefault()
        // console.log(location)
        props.getWeather(location)
        setLocation('')
    }

  return (
    <div className={`container-fluid display-bg ${props.weatherBg}`}>  
        <center className="display-data">
            <div className="row text-white">
                <div className='col-md-8 offset-md-2 bg-dark bg-opacity-50'>
                    <div className="input-group">
                        <div className="form-outline">
                            <input type="search" value={location} className="form-control" placeholder='Search' onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={getWeather}>
                            <i> <BsSearch /> </i>
                        </button>
                    </div>
                    <h1> {props.city}, {props.country} </h1>
                    <h5 className='py-4'>
                        <i className={`wi display-1 ${props.weatherIcon}`}></i>
                    </h5>
                    <h1 className="py-2"> {props.temp}&deg;</h1>
                    {minmax(props.max, props.min)}
                    <h4 className='py-3'> {props.description} </h4>
                </div>
            </div>
        </center>
    </div>
  )
}

function minmax(min, max) {
    return(
        <div>
            <h3>
                <span className="px-4"> {min}&deg; </span>
                <span className="px-4"> {max}&deg; </span>
            </h3>
        </div>
    )
}

export default Weather