import { PropsWithChildren, type ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { store } from '@app/store';
import { theme } from '@app/App';


export function renderWithProviders(
  ui: ReactElement,
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper }) }
}