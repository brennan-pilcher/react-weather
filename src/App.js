import React, { Component } from 'react';
import './App.css';
import Current from './components/Current/Current';
import InputBox from './components/InputBox/InputBox';


class App extends Component {
  state = {
    showWeather : false,
    location : ""
  }


  getInputValue = (event) => {
    this.setState({location : event.target.value});
  }

  showWeather = () => {
    //alert(this.state.location);
    this.setState({showWeather : true});
  }


  render() {

    let currentWeather = <Current location={this.state.location} />;

    if (this.state.showWeather) {
      return (
        <div className="App">
          {currentWeather}
        </div>
      );
    } else {
      return (
        <div className="App">
          <InputBox click={this.showWeather} changed={this.getInputValue} />
        </div>
      );
  }
  }
}

export default App;
