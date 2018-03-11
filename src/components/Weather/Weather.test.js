import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Weather from './Weather';

configure({ adapter: new Adapter() });

describe('Weather', () => {
    it('shows the load spinner when ready is false', () => {
        const wrapper = shallow(<Weather location={"10010"} />);
        expect(wrapper.state().ready).toEqual(false);
        expect(wrapper.find('div.progress')).toHaveLength(1);
    });

    // TODO figure out an async/await test for retrieving data
});