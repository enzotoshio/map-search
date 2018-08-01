import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledMapContainer = styled.div`
  display: grid;
  grid-template-columns: 530px 10px;
  grid-template-rows: auto;
  border: 1px solid #ededed;
  padding: 25px 30px;

  img {
    margin-top: 20px;
  }
`;

const StyledAddressLine = styled.p`
  line-height: ${props => (props.title ? '2em' : '1.5em')};
  ${props =>
    props.title &&
    css`
      font-size: 2em;
      font-weight: bold;
    `};
`;

const StyledCloseButton = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;

const StyledMap = styled.img`
  grid-column-start: 1;
  grid-column-end: 2;
`;

export default function Map({
  logradouro,
  bairro,
  localidade,
  cep,
  uf,
  geolocation,
  onClose
}) {
  return (
    <StyledMapContainer>
      <div>
        <StyledAddressLine title="true">{logradouro}</StyledAddressLine>
        <StyledAddressLine>{bairro}</StyledAddressLine>
        <StyledAddressLine>
          {localidade},{uf}
        </StyledAddressLine>
        <StyledAddressLine>{cep}</StyledAddressLine>
      </div>
      <StyledCloseButton onClick={onClose} className="close-button">
        X
      </StyledCloseButton>
      <StyledMap
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${geolocation}&zoom=13&size=540x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${geolocation}&key=AIzaSyB55YTpITUlbCiTvv-cIPNERBYfXDNKiEw`}
      />
    </StyledMapContainer>
  );
}

Map.propTypes = {
  logradouro: PropTypes.string.isRequired,
  bairro: PropTypes.string.isRequired,
  localidade: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  uf: PropTypes.string.isRequired,
  geolocation: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
