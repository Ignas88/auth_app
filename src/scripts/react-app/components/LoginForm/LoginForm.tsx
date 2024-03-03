import {type FC, type FormEvent, type MouseEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Form, ButtonRounded, ButtonContainer } from './withStyles';
import { useLoginMutation } from '@app/services/authApi';
import { isFetchBaseQueryError, isErrorWithMessage } from '@app/services/helpers'

const DEMO_USER_NAME = `${process.env.APP_DEMO_USER_NAME}`;
const DEMO_PASSWORD = `${process.env.APP_DEMO_USER_PASS}`;
export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [ login, { error } ] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleDemoClick = (e: MouseEvent) => {
    e.preventDefault();
    setUsername(DEMO_USER_NAME);
    setPassword(DEMO_PASSWORD);
  }
  const handleClearCredentials = () => {
    setUsername('');
    setPassword('');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({username, password}).unwrap()
      if (res.token) {
        navigate('/servers');
        handleClearCredentials();
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : err.data;
        if (isErrorWithMessage(errMsg)) {
          setMessage(errMsg.message);
        } else {
          setMessage(JSON.stringify(errMsg));
        }
      } else if (isErrorWithMessage(err)) {
        setMessage(err.message);
      }
      handleClearCredentials();
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {message && <Alert severity="error" onClose={() => setMessage('')}>{message}</Alert>}
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
          {!!DEMO_USER_NAME && DEMO_PASSWORD && (
            <ButtonRounded
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleDemoClick}
            >
              DEMO
            </ButtonRounded>
          )}
        </ButtonContainer>
      </Form>
    </>
  )
}