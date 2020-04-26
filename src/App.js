import React, {Component} from 'react';
import './App.css';
import Moment from 'moment';
import 'moment-timezone';

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
        document.getElementById('inputbtn').focus();
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
        weather: data.weather[0].main
      })
        this.setState({
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
      console.log(response);
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
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop" style={{backgroundImage: "url('https://front-end-noobs.com/jecko/img/wave-top.png')"}}>
            <div className="header-content">
                <div className="inner">
            </div></div>
        <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle" style={{backgroundImage: "url('https://front-end-noobs.com/jecko/img/wave-mid.png')"}}></div>
          </div>
          <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom" style={{backgroundImage: "url('https://front-end-noobs.com/jecko/img/wave-bot.png')"}}></div>
          </div>
        </div>
    </div>
    </div>

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
              City: <span>{this.state.city}, {this.state.country}, {this.state.zipcode}</span><br/>
              Local date and time is: <span>{this.state.time}</span><br/>
              Weather: <span>{this.state.weather} with {this.state.description}</span><img src={this.state.iconUrl} alt='' style={{width: '30px'}}/><br/>
              And a temperature of: <span>{this.state.temp} degrees Fahrenheit</span><br/>
              {this.getWeatherPic(this.state.weather)}
            </div>
        </div>
      </div>
        <div className='row' style={{justifyContent: 'center'}}>
            <div style={{display: (this.state.showTwo ? 'block':'none')}}>
              <h2>Invalid Zip Code. Try again!</h2>
            </div>
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
                <div className="card" id="day1">
                  {this.getWeatherPic(this.state.dayOneWeather)}
                    <div className="card-body">
                        <h5 className="card-title" id="day1date">{this.state.dayOneDate}</h5>
                        <p className="card-text" id="day1weather">Weather: {this.state.dayOneWeather}<br></br>
                        Temperature: {this.state.dayOneTemp}</p>
                    </div>
                </div>
                <div className="card" id="day2">
                {this.getWeatherPic(this.state.dayTwoWeather)}
                    <div className="card-body">
                        <h5 className="card-title" id="day2date">{this.state.dayTwoDate}</h5>
                        <p className="card-text" id="day2weather">Weather: {this.state.dayTwoWeather}<br></br>
                        Temperature: {this.state.dayTwoTemp}</p>
                    </div>
                </div>
                <div className="card" id="day3">
                {this.getWeatherPic(this.state.dayThreeWeather)}
                    <div className="card-body">
                        <h5 className="card-title" id="day3date">{this.state.dayThreeDate}</h5>
                        <p className="card-text" id="day3weather">Weather: {this.state.dayThreeWeather}<br></br>
                        Temperature: {this.state.dayThreeTemp}</p>
                    </div>
                </div>
              </div>
        </div>
    </div>
    <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12">
            <button className="homebtn"><a href="#top">Back to Top</a></button>
        </div>
    </div>
    </div>

    <footer style={{position: (this.state.show ? 'static':'absolute')}}>© 2020 Meng Yang</footer>
      </div>
     );
  }
}
 

export default App;
