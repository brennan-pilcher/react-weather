import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather/Weather';
import InputBox from './components/InputBox/InputBox';


class App extends Component {
  state = {
    showWeather : false,
    location : {
      type: "",
      location: "",
      valid : false
    },
    geolocation : {
      capable : false,
      allowed : false,
      buttonText : "ALLOW GEOLOCATION?"
    }
  }


  getInputValue = (event) => {
    // valid zip code entered
    if ( event.target.value.length == 5 && !isNaN(parseInt(event.target.value)) ) {
      this.setState({location: { type: "zip", location: event.target.value, valid : true }});
    }
    else {
      if ( this.state.location.valid ) { this.setState({location : { type: this.state.location.type, location: this.state.location.location, valid : false } }); }
    }
  }

  geolocate = () => {
    if (this.state.geolocation.capable) {
      // attempting to geolocate
      this.setState({
        geolocation : {
          capable : true,
          allowed : this.state.geolocation.allowed,
          buttonText : "GEOLOCATING..."
        }
      });

      navigator.geolocation.getCurrentPosition( (pos) => {
        console.log(pos);
        // success
        this.setState({
          geolocation : {
            capable : true,
            allowed : true,
            buttonText : "GEOLOCATED!"
          },
          location : {
            type: "latlong",
            location: "lat=" + pos.coords.latitude.toFixed(2).toString() + "&lon=" + pos.coords.longitude.toFixed(2).toString(),
            valid : true
          },
          showWeather : true
        });

      }, (err) => {
        console.log(err);
        if (err.code == err.PERMISSION_DENIED) {
          // permission denied
          this.setState({
            geolocation : {
              capable : true,
              allowed : false,
              buttonText : "GEOLOCATION BLOCKED"
            }
          });
        }
        if (err.code == err.TIMEOUT) {
          // timeout
          this.setState({
            geolocation : {
              capable : true,
              allowed : false,
              buttonText : "TIMEOUT GETTING LOCATION"
            }
          });
        }
        else {
          // misc errors
          this.setState({
            geolocation : {
              capable : true,
              allowed : false,
              buttonText : "GEOLOCATION ERROR"
            }
          });
        }
      }, {enableHighAccuracy: false, timeout:10000, maximumAge: 0});
    }
  }

  showWeather = () => {
    //alert(this.state.location);
    this.setState({showWeather : true});
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      this.setState({
        geolocation: {
          capable : true,
          allowed : this.state.geolocation.allowed,
          buttonText : this.state.geolocation.buttonText
        }
      });
    } else {
        this.setState({
          geolocation: {
            capable: false,
            allowed : this.state.geolocation.allowed,
            buttonText : "GEOLOCATION DISABLED"
          }
        });
    }
  }

  render() {
    let currentWeather = <Weather location={this.state.location} />;

    if (this.state.showWeather) {
      return (
        <div className="App">
          {currentWeather}
        </div>
      );
    } else {
      return (
        <div className="App">
          <InputBox  geoButtonDisabled={this.state.geolocation.capable ? '' : 'disabled'} geolocation={this.state.geolocation} zipButtonDisabled={this.state.location.valid ? '' : 'disabled'} geoClick={this.geolocate} click={this.showWeather} changed={this.getInputValue} />
        </div>
      );
  }
  }
}

export default App;
