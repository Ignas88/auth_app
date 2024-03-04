import reducer, { setIsLoggedIn, setIsLoggedOut, initialState } from './auth';
import { renderWithProviders } from '@app/utils/test-utils';
import { Navbar } from '@app/components/NavBar';
import { screen, act } from '@testing-library/react';
import { store } from '@app/store';

beforeEach((): void => {
  renderWithProviders(<Navbar />);
});
describe('Auth', () => {
  test('should return Auth initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  test('Login button should be visible, Servers button should not exist', () => {
    expect(screen.queryByTestId('servers-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-btn')).toBeInTheDocument();
  });
  test('should log in if token is available', () => {
    jest.useFakeTimers();
    expect(reducer(initialState, setIsLoggedIn({token: 'mock'}))).toEqual(
      { isLoggedIn: true, token: 'mock' });
  });
  test('servers button should be visible after login', () => {
    act(() => {
      store.dispatch(setIsLoggedIn({token: 'mock'}));
    });
    expect(screen.queryByTestId('logout-btn')).toBeInTheDocument();
  });
  test('should get back to initial state with log out', () => {
    expect(reducer(initialState, setIsLoggedOut())).toEqual(
      initialState)
  })
})
