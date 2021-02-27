import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 15px;
  height: 15px;
  padding: 10px;
  ${(props) =>
    props.available &&
    css`
      background: #afec1a;
    `}
  ${(props) =>
    props.limited &&
    css`
      background: #ffe033;
    `}
    ${(props) =>
    props.unavailable &&
    css`
      background: #ec241a;
    `};
`;

export default TrafficLight;
