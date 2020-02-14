import React from 'react';
import { shallow } from 'enzyme';
import Moods from './Moods';
import store from '../store';
import { Provider } from 'react-redux';

describe('mood component', () => {
  it('renders mood', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Moods />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
