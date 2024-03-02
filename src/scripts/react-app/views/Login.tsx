import { type FC } from 'react';
import {LoginForm} from '@app/components/LoginForm';
import {Container} from '@app/components/ViewContainer';


export const Login: FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}