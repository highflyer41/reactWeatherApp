import React from 'react';

const WeatherCard = (props) => {
    return ( 
        <div className="card">
            {props.weatherPic}
                <div className="card-body">
                    <h5 className="card-title">{props.dayDate}</h5>
                    <p className="card-text">Weather: {props.dayWeather}<br></br>
                    Temperature: {props.dayTemp} °F</p>
                </div>
        </div>
     );
}
 
export default WeatherCard;