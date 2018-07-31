import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { search } from "./redux/animes/actions";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {
    this.props.boundSearch("Dragon");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

const mapDispatchToProps = {
  boundSearch: search
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
