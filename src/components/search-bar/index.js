import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from '../button';

const StyledInput = styled.input`
  border-radius: 3px;
  height: 30px;
  border: 1px solid #ccc;
  margin-right: 15px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 35px;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  color: F5F5F5;
  text-transform: uppercase;
  margin-right: 15px;
`;

const StyledErrorMessage = styled.p`
  font-size: 0.7em;
  color: red;
  margin-top: 10px;
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { isValidSearchTerm: false };
  }

  handleChange(event) {
    const isValidSearchTerm =
      event.target.value.match(/^[0-9]{5}-[0-9]{3}$/gm) !== null;

    this.setState({ isValidSearchTerm });

    this.props.onChange(event);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.searchTerm === '') return;

    this.props.onSubmit();
  }

  render() {
    const { isValidSearchTerm } = this.state;
    const { searchTerm, errorMessage } = this.props;

    return (
      <div>
        <StyledTitle>Consultar</StyledTitle>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledLabel>CEP</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Type the formated CEP (00000-000)"
            value={searchTerm}
            onChange={this.handleChange}
          />
          <Button type="submit" disabled={!isValidSearchTerm}>
            Search
          </Button>
        </StyledForm>
        {!isValidSearchTerm &&
          !_.isEmpty(searchTerm) && (
            <StyledErrorMessage className="error-message">
              CEP inválido
            </StyledErrorMessage>
          )}
        {!_.isEmpty(errorMessage) && (
          <StyledErrorMessage className="error-message">
            {errorMessage}
          </StyledErrorMessage>
        )}
      </div>
    );
  }
}

SearchBar.defaultProps = {
  errorMessage: ''
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default SearchBar;
