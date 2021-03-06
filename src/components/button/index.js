import styled from 'styled-components';

export default styled.button`
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 1em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border: 0.15em solid #6da6ce;
  border-radius: 3px;
  padding: 0 1.3em;
  background-color: ${props => (props.disabled ? '#ccc' : '#5c9dc9')};
  border-color: ${props => (props.disabled ? '#ccc' : '#6da6ce')};
  display: block;
  color: #fff;
  height: 33px;
  cursor: pointer;
`;
