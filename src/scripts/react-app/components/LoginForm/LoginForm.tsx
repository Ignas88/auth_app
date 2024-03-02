import {type FC, type FormEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import { Form, ButtonRounded, ButtonContainer } from './withStyles';


export const LoginForm: FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoClick = () => {
    setUserName('tesonet')
    setPassword('partyanimal')
    console.log('demo')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(userName, password)
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
          value={userName}
          onChange={(e) => setUserName(e.target.value || '')}
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
            disabled={!userName || !password}
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