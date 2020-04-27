import React, {Component} from 'react';
import './App.css';
import Moment from 'moment';
import 'moment-timezone';
import Background from './background';
import WeatherCard from './weatherCard';
import TopButton from './topButton';
import Footer from './footer';
import ErrorMessage from './errorMessage';
import WeatherInfo from './weatherInfo';

class App extends Component {
  state = { 
    zipcode: '',
    timezone: '',
    lat: 0,
    long: 0,
    country: '',
    temp: 0,
    city: '',
    description: '',
    weather: '',
    show: false,
    dayOneDate: '',
    dayOneWeather: '',
    dayOneTemp: 0,
    dayTwoDate: '',
    dayTwoWeather: '',
    dayTwoTemp: 0,
    dayThreeDate: '',
    dayThreeWeather: '',
    dayThreeTemp: 0,
    showTwo: false,
    errMessage: '',
    iconUrl: '',
   }

   isEmpty = (zipIn, countryIn) => {
     if(zipIn === ''){
        alert('Enter a zip code!');
        return true;
     }
     if(countryIn === ''){
       alert('Enter a country code!');
       return true;
     }
   }

   handleClick = () => {
     let zip = document.getElementById('input').value;
     let cntry = document.getElementById('inputCountry').value;
     
     if(this.isEmpty(zip, cntry)){
      return;
     } else {
      this.setState({
        zipcode: zip,
        country: cntry.toUpperCase(),
      });
      setTimeout(() => {
        this.getWeather();
        document.getElementById('input').blur();
      }, 200);
     }
   }

   handlePress = (key) => {
      if(key.keyCode === 13) {
        this.handleClick();
      }
   }

  getWeather = () => {
    let {zipcode} = this.state;
    let {country} = this.state;
    fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zipcode+","+country+"&APPID=36de89dd9ba1aaa422fa4d99ab092bef&units=imperial")
    .then((response) => {
      if(!response.ok){
        this.setState({
          show: false,
          showTwo: true,
        })
        throw new Error("Invalid Zip Code");
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        lat: data.coord.lat,
        long: data.coord.lon,
        description: data.weather[0].description,
        weather: data.weather[0].main,
        show: true,
        showTwo: false,
      });
        this.getMoreWeather(this.state.lat, this.state.long);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getMoreWeather = (lati, longi) => {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lati+"&lon="+longi+"&units=imperial&appid=36de89dd9ba1aaa422fa4d99ab092bef")
    .then((response) => { return response.json()})
    .then((response) => {
      //console.log(response);
      this.setState({
        timezone: response.timezone,
        iconUrl: "http://openweathermap.org/img/wn/"+response.current.weather[0].icon+"@2x.png",
        dayOneWeather: response.daily[1].weather[0].main,
        dayOneTemp: response.daily[1].temp.day,
        dayTwoWeather: response.daily[2].weather[0].main,
        dayTwoTemp: response.daily[2].temp.day,
        dayThreeWeather: response.daily[3].weather[0].main,
        dayThreeTemp: response.daily[3].temp.day,
      })
      this.getTime();
    })
  }

  getTime = () => {
    let moment = Moment();
    let zone = this.state.timezone;
    let currentTime = moment.tz(zone).format('dddd, MMMM Do YYYY, h:mm:ss a');
    let day1 = moment.tz(zone).add(1, 'd').format('dddd, MMMM Do YYYY');
    let day2 = moment.tz(zone).add(1, 'd').format('dddd, MMMM Do YYYY');
    let day3 = moment.tz(zone).add(1, 'd').format('dddd, MMMM Do YYYY');
    //console.log(zone);
    this.setState({
      time: currentTime,
      dayOneDate: day1,
      dayTwoDate: day2,
      dayThreeDate: day3,
    });
  }

  getWeatherPic = (param) => {
    switch(param) {
      case "Clear": 
           return <img className='img-fluid' src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif' alt=''/>
      case "Thunderstorm": 
          return <img className='img-fluid' src='https://media.giphy.com/media/xUOwGoNa2uX6M170d2/source.gif' alt=''/>
      case "Drizzle":
      case "Rain":
          return <img className='img-fluid' src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif' alt=''/>
      case "Snow":
          return <img className='img-fluid' src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'alt=''/>
      case "Clouds":
          return <img className='img-fluid' src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'alt=''/>
      default:
          return <img className='img-fluid' src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'alt=''/>
    }
  }

  getMap = (lati, longi) => {
    let url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCrG6kFec63ZBGK-h-cfowgrwRzBM1Rjto&q="+lati+","+longi+"&zoom=10";

    return (
      <iframe title="map"
        frameborder="0" style={{border :0, width:"100%", height:"100%"}}
        src = {url}>
      </iframe>
    )
  }

  render() { 
    return ( 
      <div>
      <Background/>

    <div className="container page1" id="top">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12 main">
        <h1>Weather Checker App</h1>
        <h4>Check the weather and time by zip code</h4>
        <input type="text" name="input" id={"input"} placeholder="zip code: ex. 12345" onKeyUp={(e) => {this.handlePress(e)}}/>
        <input type="text" id={"inputCountry"} defaultValue="us" placeholder="Country Alpha-2 Code" onKeyUp={(e) => {this.handlePress(e)}}/>
        <button id={"inputbtn"} onClick={() => {this.handleClick()}}>Submit</button>
        <button id="threeDayForcast" style={{display: (this.state.show ? 'inline-block':'none')}}><a href="#page2">Three Day Forecast</a></button>
      </div></div>
      <div className="row">
        <div className="col-sm-5 col-md-5 col-xs-5 main2">
            <div style={{display: (this.state.show ? 'inline-block':'none'), width: '100%', height: '100%'}}>
              {this.getMap(this.state.lat, this.state.long)}
            </div></div>
            <div className="col-sm-7 col-md-7 col-xs-7 main2">
            <div id="datebox" style={{display: (this.state.show ? 'inline-block':'none')}}>
              <WeatherInfo city={this.state.city} 
              country={this.state.country} 
              zipcode={this.state.zipcode} time={this.state.time} 
              weather={this.state.weather} 
              description={this.state.description} 
              iconUrl={this.state.iconUrl} temp={this.state.temp} 
              weatherPic={this.getWeatherPic(this.state.weather)} />
            </div>
        </div>
      </div>
        <div className='row' style={{justifyContent: 'center'}}>
            <ErrorMessage showTwo={this.state.showTwo} />
        </div>
      </div>

      <div className="container" id="page2" style={{display: (this.state.show ? 'block':'none')}}>
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xs-12" id="citybox"><h3>Three day forecast for {this.state.city}, {this.state.country}</h3>
            </div>
        </div>
    <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12">
            <div className="card-deck">
              <WeatherCard weatherPic={this.getWeatherPic(this.state.dayOneWeather)} dayDate={this.state.dayOneDate} 
              dayWeather={this.state.dayOneWeather}
              dayTemp={this.state.dayOneTemp} />
              <WeatherCard weatherPic={this.getWeatherPic(this.state.dayTwoWeather)} dayDate={this.state.dayTwoDate} 
              dayWeather={this.state.dayTwoWeather}
              dayTemp={this.state.dayTwoTemp} />
              <WeatherCard weatherPic={this.getWeatherPic(this.state.dayThreeWeather)} dayDate={this.state.dayThreeDate} 
              dayWeather={this.state.dayThreeWeather}
              dayTemp={this.state.dayThreeTemp} />
            </div>
        </div>
    </div>
    <div className="row">
        <TopButton/>
    </div>
    </div>

    <Footer show={this.state.show} />
    </div>
     );
  }
}

export default App;