import React from 'react';
import styled from 'styled-components';

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
    // this.handleChange = this.handleChange.bind(this);

    this.state = { searchTerm: '' };
  }

  // handleChange(event) {
  //   this.setState({ searchTerm: event.target.value });
  // }

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

export default SearchBar;
