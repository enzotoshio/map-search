import React from "react";
import styled from "styled-components";

import Button from "../button";

const StyledInput = styled.input`
  border-radius: 3px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 35px;
`;

export default function SearchBar(props) {
  return (
    <StyledForm onSubmit={props.onSubmit}>
      <StyledInput
        type="text"
        placeholder="Type the anime name"
        value={props.searchTerm}
        onChange={props.onChange}
      />
      <Button type="submit">Search</Button>
    </StyledForm>
  );
}
