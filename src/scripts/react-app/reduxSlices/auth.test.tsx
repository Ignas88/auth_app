import reducer, { setIsLoggedIn, setIsLoggedOut, initialState } from './auth'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: '' })).toEqual(initialState)
});
it('should log in if token is available', () => {
  expect(reducer(initialState, setIsLoggedIn({token: 'mock'}))).toEqual(
    { isLoggedIn: true, token: 'mock' })
})
test('should get back to initial state with log out', () => {
  expect(reducer(initialState, setIsLoggedOut())).toEqual(
    initialState)
})