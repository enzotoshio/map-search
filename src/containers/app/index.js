import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { search } from "../../redux/animes/actions";
import { getAnimes, getIsFetching } from "../../redux/animes/selectors";
import Gallery from "../../components/gallery";
import SearchBar from "../../components/search-bar";
import Header from "../../components/header";

const StyledTitle = styled.h1`
  color: #fff;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      initialSearch: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();

    const searchTerm = this.state.searchTerm;

    this.props.boundSearch(searchTerm);
    this.setState({ initialSearch: true });
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <Header>
          <StyledTitle>Anime search</StyledTitle>
          <SearchBar
            onSubmit={this.handleSearch}
            onChange={this.handleChange}
            searchTerm={this.state.searchTerm}
          />
        </Header>

        <Gallery
          isFetching={this.props.isFetching}
          animes={this.props.animes}
          fetched={this.state.initialSearch}
        />
      </div>
    );
  }
}

App.defaultProps = {
  animes: []
};

App.propTypes = {
  animes: PropTypes.arrayOf(Object)
};

const mapDispatchToProps = {
  boundSearch: search
};

const mapStateToProps = state => ({
  animes: getAnimes(state),
  isFetching: getIsFetching(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
