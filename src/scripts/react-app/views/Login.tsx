import { type FC } from 'react';
import styled from 'styled-components';
import {LoginForm} from '@app/components/LoginForm';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const Login: FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}