import React from 'react';
import { mount } from 'enzyme';

import Map from '../../../components/map';

describe('Map', () => {
  describe('when button is clicked', () => {
    it('should call the function passed to onClose', () => {
      const logradouro = 'pimba';
      const localidade = 'pumba';
      const bairro = 'mufasa';
      const cep = 'simba';
      const uf = 'scar';
      const geolocation = 'zazu';
      const closeMapSpy = jest.fn();
      const component = mount(
        <Map
          logradouro={logradouro}
          localidade={localidade}
          bairro={bairro}
          cep={cep}
          uf={uf}
          geolocation={geolocation}
          onClose={closeMapSpy}
        />
      );
      const closeButton = component.find('.close-button').hostNodes();

      closeButton.simulate('click');

      expect(closeMapSpy).toHaveBeenCalledTimes(1);

      closeMapSpy.mockReset();
    });
  });
});
