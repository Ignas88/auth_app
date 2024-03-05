import reducer, { setIsLoggedIn, setIsLoggedOut, initialState } from './auth';
import { renderWithProviders } from '@app/utils/test-utils';
import { Navbar } from '@app/components/NavBar';
import { screen, act } from '@testing-library/react';
import { store } from '@app/store';

beforeEach((): void => {
  renderWithProviders(<Navbar />);
});
const persistParams = {
  "_persist": {"rehydrated": true, "version": -1},
}
describe('Auth', () => {
  test('should return Auth reducer initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
  test('store should contain auth reducer state with persist params', () => {
    expect(store.getState().auth).toEqual({...persistParams, ...initialState});
  });
  test('Login button should be visible, Servers button should not exist', () => {
    expect(screen.queryByTestId('servers-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-btn')).toBeInTheDocument();
  });
  test('should change isLoggedIn value if token is provided', () => {
    expect(reducer(initialState, setIsLoggedIn({token: 'mock'}))).toEqual(
      { isLoggedIn: true, token: 'mock' });
  });
  test('servers, log-out buttons should be visible after login, store should contain auth reducer state with persist params', () => {
    act(() => {
      store.dispatch(setIsLoggedIn({token: 'mock'}));
    });
    expect(store.getState().auth).toEqual(
      {...persistParams, ...{isLoggedIn: true, token: 'mock'}
    });
    expect(screen.queryByTestId('logout-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('servers-btn')).toBeInTheDocument();
  });
  test('should get back to initial state with log out and servers button should not be visible', () => {
    act(() => {
      store.dispatch(setIsLoggedOut());
    });
    expect(store.getState().auth).toEqual({...persistParams, ...initialState});
    expect(screen.queryByTestId('servers-btn')).not.toBeInTheDocument();
  })
})
