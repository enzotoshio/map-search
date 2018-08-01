import React from 'react';
import { mount } from 'enzyme';

import SearchBar from '../../../components/search-bar';

describe('Map', () => {
  describe('when input changes', () => {
    it('should call the function passed to onChange', () => {
      const handleSearch = () => {};
      const searchTerm = 'pumba';
      const errorMessage = null;
      const handleChangeSpy = jest.fn();
      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );
      const searchInputEl = component.find('input').hostNodes();

      searchInputEl.simulate('change', { target: { value: 'Mufasa' } });

      expect(handleChangeSpy).toHaveBeenCalledTimes(1);

      handleChangeSpy.mockReset();
    });
  });
});
