import styled, { keyframes } from "styled-components";
import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <Icon>
      <VscLoading size={36} />
    </Icon>
  );
};

export default Loading;

const rotate = keyframes`
from {
    transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35vh;
  animation: ${rotate} 2s linear infinite;
  padding: 5px;
  font-size: 1.2rem;
`;
