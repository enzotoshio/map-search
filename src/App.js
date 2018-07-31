import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./App.css";
import { search } from "./redux/animes/actions";
import { getAnimes, getIsFetching } from "./redux/animes/selectors";

import Gallery from "./components/gallery";

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
        <header className="App-header">
          <h1 className="App-title">Anime search</h1>
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              placeholder="Digite o nome do anime"
              value={this.state.searchTerm}
              onChange={this.handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </header>

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
