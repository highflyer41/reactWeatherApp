import React from 'react';

const WeatherInfo = (props) => {
    return ( 
        <>
        City: <span>{props.city}, {props.country}, {props.zipcode}</span><br/>
        Local date and time is: <span>{props.time}</span><br/>
        Weather: <span>{props.weather} with {props.description}</span><img src={props.iconUrl} alt='' style={{width: '30px'}}/><br/>
        And a temperature of: <span>{props.temp} °F</span><br/>
        {props.weatherPic}
        </>
     );
}
 
export default WeatherInfo;