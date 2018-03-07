import React, { Component } from 'react';
import './App.css';
import Weather from './components/Weather/Weather';
import InputBox from './components/InputBox/InputBox';


class App extends Component {
  state = {
    showWeather : false,
    location : { type: "zip", location: "", valid : false }
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

  showWeather = () => {
    //alert(this.state.location);
    this.setState({showWeather : true});
  }

  componentDidMount() {
    fetch('https://react-weather-backend.herokuapp.com/weather/wake')
      .then(response => {
        console.log(response);
      })
  }


  render() {

    let currentWeather = <Weather location={this.state.location.location} />;

    if (this.state.showWeather) {
      return (
        <div className="App">
          {currentWeather}
        </div>
      );
    } else {
      return (
        <div className="App">
          <InputBox buttonDisabled={this.state.location.valid ? '' : 'disabled'} click={this.showWeather} changed={this.getInputValue} />
        </div>
      );
  }
  }
}

export default App;
