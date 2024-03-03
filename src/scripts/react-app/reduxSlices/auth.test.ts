import reducer, { setIsLoggedIn, setIsLoggedOut, initialState } from './auth'

test('should return the initial state', () => {
  expect(reducer(undefined, { type: '' })).toEqual(initialState)
})