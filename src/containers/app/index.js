import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { search } from '../../redux/addresses/actions';
import {
  getAddressesByCEP,
  getIsFetching,
  getSucceeded
} from '../../redux/addresses/selectors';
import SearchBar from '../../components/search-bar';
import Map from '../../components/map';

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
    this.props.boundSearch(this.state.searchTerm);
    this.setState({ openMap: true });
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  closeMap() {
    this.setState({ openMap: false, searchTerm: '' });
  }

  render() {
    const searchedAddress =
      this.props.addresse && this.state.searchTerm
        ? this.props.addresses[this.state.searchTerm]
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
          />
        </StyledSearchBarContainer>

        {this.state.openMap &&
          this.props.succeeded && (
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
  addresses: {}
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
  })
};

const mapDispatchToProps = {
  boundSearch: search
};

const mapStateToProps = state => ({
  addresses: getAddressesByCEP(state),
  isFetching: getIsFetching(state),
  succeeded: getSucceeded(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
