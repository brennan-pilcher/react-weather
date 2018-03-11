import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InputBox from './InputBox';

configure({ adapter: new Adapter() });

describe('InputBox', () => {
    it('should render the location chooser', () => {
        const wrapper = shallow(<InputBox />);
        expect(wrapper.find('div.input-field')).toHaveLength(1);
    });
});