import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.searchTerm === '') return;

    this.props.onSubmit();
  }

  render() {
    return (
      <div>
        <StyledTitle>Consultar</StyledTitle>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledLabel>CEP</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Type the anime name"
            value={this.props.searchTerm}
            onChange={this.props.onChange}
          />
          <Button type="submit">Search</Button>
        </StyledForm>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
