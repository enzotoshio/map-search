import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import App from '../../../containers/app';
import Reducer from '../../../redux/root-reducer';
import { searchByCEPRequested } from '../../../redux/addresses/actions';

describe('connected App', () => {
  describe('when handleChange is called', () => {
    it('should update the component state with the correct values', async () => {
      const store = createStore(Reducer);
      const payload = { target: { value: 'pimba' } };
      const app = shallow(<App store={store} />);
      const appInstance = app.dive().instance();

      appInstance.handleChange(payload);

      const assert = {
        searchTerm: payload.target.value
      };
      expect(appInstance.state).toEqual(expect.objectContaining(assert));
    });
  });

  describe('when isFetching is true', () => {
    it('should render a Spinner component', async () => {
      const store = createStore(Reducer);
      store.dispatch(searchByCEPRequested());

      const app = shallow(<App store={store} />);

      expect(
        app
          .dive()
          .find('Spinner')
          .exists()
      ).toBe(true);
    });
  });
});
