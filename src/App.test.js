import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import InputBox from './components/InputBox/InputBox';
import Weather from './components/Weather/Weather';

configure({ adapter: new Adapter() });

describe('App', ()=> {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div.App')).toHaveLength(1);
  });

  it('contains an InputBox component when showWeather is false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().showWeather).toEqual(false);
    expect(wrapper.find(InputBox)).toHaveLength(1);
  });

  it('contains a Weather component when showWeather is true', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      showWeather : true,
      location : { type : "zip", location : "10010", valid : true }
    });
    expect(wrapper.state().showWeather).toEqual(true);
    expect(wrapper.find(Weather)).toHaveLength(1);
  });

});
