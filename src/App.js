import React, {Component} from 'react';
import './App.css';
import Moment from 'moment';
import 'moment-timezone';
import zipTz from 'zipcode-to-timezone';

class App extends Component {
  state = { 
    zipcode: '',
    lat: 0,
    long: 0,
    country: '',
    temp: 0,
    city: '',
    description: '',
    weather: '',
    show: false
   }

   handleClick = () => {
     let zip = document.getElementById('input').value;
     let cntry = document.getElementById('inputCountry').value;
     this.setState({
       zipcode: zip,
       country: cntry.toUpperCase(),
    });
     setTimeout(() => {
        this.getWeather();
        this.getTime();
        this.setState({show: true});
     }, 200);
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
        throw new Error("Invalid Zip Code");
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        lat: data.lat,
        long: data.lng,
        description: data.weather[0].description,
        weather: data.weather[0].main
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getMoreWeather = (lati, longi) => {

  }

  getTime = () => {
    let moment = Moment();
    let zone = zipTz.lookup(this.state.zipcode);
    let currentTime = moment.tz(zone).format('dddd, MMMM Do YYYY, h:mm:ss a');
    //console.log(zone);
    this.setState({time: currentTime});
  }

  getWeatherPic = (param) => {
    switch(param) {
      case "Clear": 
           return <img src='https://media.giphy.com/media/QZz9r30N2RM7DFIXqE/source.gif' alt=''/>
      case "Thunderstorm": 
          return <img src='https://media.giphy.com/media/xUOwGoNa2uX6M170d2/source.gif' alt=''/>
      case "Drizzle":
      case "Rain":
          return <img src='https://media.giphy.com/media/U7yxnzr21Xhnnb7Zxz/source.gif' alt=''/>
      case "Snow":
          return <img src='https://media.giphy.com/media/6YNgoTEPs6vZe/source.gif'alt=''/>
      case "Clouds":
          return <img src='https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/source.gif'alt=''/>
      default:
          return <img src='https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/source.gif'alt=''/>
  }
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
        <button id="inputbtn" onClick={() => {this.handleClick()}}>Submit</button>
        <button id="threeDayForcast"><a href="#page2">Three Day Forecast</a></button>
      </div></div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12 main2">
            <div id="datebox" style={{display: (this.state.show ? 'block':'none')}}>
              City: <span>{this.state.city}, {this.state.country}, {this.state.zipcode}</span><br/>
              Local date and time is: <span>{this.state.time}</span><br/>
              Weather: <span>{this.state.weather} with {this.state.description}</span><br/>
              And a temperature of: <span>{this.state.temp} degrees Fahrenheit</span><br/>
              {this.getWeatherPic(this.state.weather)}
            </div>
        </div>
      </div></div>

      <div className="container" id="page2">
        <div className="row">
            <div className="col-sm-12 col-md-12 col-xs-12" id="citybox"> Three day forecast for
            </div>
        </div>
    <div className="row">
        <div className="col-sm-12 col-md-12 col-xs-12">
            <div className="card-deck">
                <div className="card" id="day1">
                    <div className="card-body">
                            <h5 className="card-title" id="day1date">Date:</h5>
                            <p className="card-text" id="day1weather">weather info</p>
                    </div>
                </div>
                <div className="card" id="day2">
                    <div className="card-body">
                        <h5 className="card-title" id="day2date">Date:</h5>
                        <p className="card-text" id="day2weather">weather info</p>
                    </div>
                </div>
                <div className="card" id="day3">
                    <div className="card-body">
                        <h5 className="card-title" id="day3date">Date:</h5>
                        <p className="card-text" id="day3weather">weather info</p>
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
      </div>
     );
  }
}
 

export default App;
