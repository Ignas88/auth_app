import {type FC, type FormEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Form, ButtonRounded, ButtonContainer } from './withStyles';
import { useLoginMutation } from '@app/services/authApi';


export const LoginForm: FC = () => {
  const [ login, {data, isSuccess, isLoading} ] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoClick = () => {
    setUsername('tesonet')
    setPassword('partyanimal')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const returned = await login({username, password}).unwrap();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TextField
          required
          id="username"
          name="username"
          label="User name"
          color="secondary"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value || '')}
        />
        <TextField
          required
          id="password"
          name="password"
          type="password"
          label="Password"
          color="secondary"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value || '')}
        />
        <ButtonContainer>
          <ButtonRounded
            type="submit"
            size="large"
            variant="contained"
            disabled={!username || !password}
          >
            Login
          </ButtonRounded>
          <ButtonRounded
            type="submit"
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleDemoClick}
          >
            DEMO Login
          </ButtonRounded>
        </ButtonContainer>
      </Form>
    </>
  )
}