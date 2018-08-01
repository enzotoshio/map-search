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

    it('should validate, set it in the state and show an error message', () => {
      const handleSearch = () => {};
      const errorMessage = null;
      const handleChangeSpy = () => {};
      const searchTerm = '';
      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );

      component.setProps({ searchTerm: 'mufasa' });
      const searchInputEl = component.find('input').hostNodes();
      searchInputEl.simulate('change', { target: { value: 'Mufasa' } });

      const errorMessageEl = component.find('.error-message').hostNodes();
      expect(errorMessageEl).toHaveLength(1);
    });
  });

  describe('when isValidSearchTerm is true', () => {
    it('should not show an error message disregard of the searchTerm', () => {
      const handleSearch = () => {};
      const errorMessage = null;
      const handleChangeSpy = () => {};
      const searchTerm = 'mufasa';
      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );

      component.setState({ isValidSearchTerm: true });

      const errorMessageEl = component.find('.error-message').hostNodes();
      expect(errorMessageEl).toHaveLength(0);
    });
  });

  describe('when searchTerm is empty', () => {
    it('should not show an error message disregard of the isValidSearchTerm', () => {
      const handleSearch = () => {};
      const errorMessage = null;
      const handleChangeSpy = () => {};
      const searchTerm = '';
      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );

      component.setState({ isValidSearchTerm: false });

      const errorMessageEl = component.find('.error-message').hostNodes();
      expect(errorMessageEl).toHaveLength(0);
    });
  });

  describe('when errorMessage is not empty', () => {
    it('should show an error message', () => {
      const handleSearch = () => {};
      const errorMessage = null;
      const handleChangeSpy = () => {};
      const searchTerm = '';
      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );

      component.setProps({ errorMessage: 'pimba' });

      const errorMessageEl = component.find('.error-message').hostNodes();
      expect(errorMessageEl).toHaveLength(1);
    });
  });

  describe('when errorMessage is empty', () => {
    it('should not show an error message', () => {
      const handleSearch = () => {};
      const errorMessage = null;
      const handleChangeSpy = () => {};
      const searchTerm = '';

      const component = mount(
        <SearchBar
          onChange={handleChangeSpy}
          searchTerm={searchTerm}
          onSubmit={handleSearch}
          errorMessage={errorMessage}
        />
      );

      const errorMessageEl = component.find('.error-message').hostNodes();
      expect(errorMessageEl).toHaveLength(0);
    });
  });

  describe('when form submits', () => {
    it('should call the function passed to onSubmit', () => {
      const handleSearchSpy = jest.fn();
      const searchTerm = 'pumba';
      const errorMessage = null;
      const handleChange = () => {};
      const component = mount(
        <SearchBar
          onChange={handleChange}
          searchTerm={searchTerm}
          onSubmit={handleSearchSpy}
          errorMessage={errorMessage}
        />
      );
      const searchInputEl = component.find('form').hostNodes();

      searchInputEl.simulate('submit');

      expect(handleSearchSpy).toHaveBeenCalledTimes(1);

      handleSearchSpy.mockReset();
    });
  });
});
