import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ForecastDay from './ForecastDay';

configure({ adapter: new Adapter() });

describe('ForecastDay', () => {
    it('should render a daily forecast item', () => {
        const wrapper = shallow(<ForecastDay />);
        expect(wrapper.find('div.forecast-day')).toHaveLength(1);
    })
})