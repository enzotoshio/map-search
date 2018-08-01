import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import { searchByCEP } from '../../redux/addresses/actions';
import {
  getAddressesByCEP,
  getIsFetching,
  getSucceeded,
  getErrorMessage
} from '../../redux/addresses/selectors';
import SearchBar from '../../components/search-bar';
import Map from '../../components/map';
import Spinner from '../../components/spinner';

const StyledTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
`;

const StyledSearchBarContainer = styled.div`
  width: 100%;
  margin: 20px auto;
  background-color: #ededed;
  padding: 30px 30px 50px 30px;
  box-sizing: border-box;
`;

const StyledAppContainer = styled.div`
  width: 600px;
  margin: 20px auto;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { openMap: false, searchTerm: '' };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeMap = this.closeMap.bind(this);
  }

  handleSearch() {
    const { searchTerm } = this.state;

    this.props.boundSearch(searchTerm);
    this.setState({ openMap: true });
  }

  handleChange({ target }) {
    this.setState({ searchTerm: target.value });
  }

  closeMap() {
    this.setState({ openMap: false, searchTerm: '' });
  }

  render() {
    const { addresses, isFetching, succeeded, errorMessage } = this.props;
    const searchedAddress =
      addresses && this.state.searchTerm && addresses[this.state.searchTerm]
        ? addresses[this.state.searchTerm]
        : {};
    const {
      lat,
      lng,
      logradouro,
      bairro,
      localidade,
      uf,
      cep
    } = searchedAddress;
    const geolocation = `${lat},${lng}`;

    return (
      <StyledAppContainer>
        <StyledTitle>Consulta de endereço</StyledTitle>
        <StyledSearchBarContainer>
          <SearchBar
            onChange={this.handleChange}
            searchTerm={this.state.searchTerm}
            onSubmit={this.handleSearch}
            errorMessage={errorMessage}
          />
        </StyledSearchBarContainer>

        {isFetching && <Spinner />}

        {this.state.openMap &&
          succeeded &&
          !_.isEmpty(searchedAddress) && (
            <Map
              logradouro={logradouro}
              localidade={localidade}
              bairro={bairro}
              uf={uf}
              cep={cep}
              geolocation={geolocation}
              onClose={this.closeMap}
            />
          )}
      </StyledAppContainer>
    );
  }
}

App.defaultProps = {
  addresses: {},
  errorMessage: ''
};

App.propTypes = {
  addresses: PropTypes.shape({
    lat: PropTypes.string,
    lng: PropTypes.string,
    logradouro: PropTypes.string,
    localidade: PropTypes.string,
    bairro: PropTypes.string,
    uf: PropTypes.string,
    cep: PropTypes.string
  }),
  errorMessage: PropTypes.string,
  boundSearch: PropTypes.func.isRequired,
  succeeded: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapDispatchToProps = {
  boundSearch: searchByCEP
};

const mapStateToProps = state => ({
  addresses: getAddressesByCEP(state),
  isFetching: getIsFetching(state),
  succeeded: getSucceeded(state),
  errorMessage: getErrorMessage(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
