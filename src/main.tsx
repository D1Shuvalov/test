import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'
import '/index.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {defaultTheme} from "./theme";
import {ThemeProvider} from "styled-components";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
