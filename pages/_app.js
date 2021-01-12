import { Box, Container, CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SWRConfig } from 'swr';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Router } from 'next/dist/client/router';
import { AuthProvider } from '../context/auth';
import { NavProvider } from '../context/nav';
import { NotificationProvider } from '../context/notification';
import { ChargersProvider } from '../context/chargers';
import { SnackbarProvider } from 'notistack';
config.autoAddCss = false;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
NProgress.configure({
  showSpinner: false,
  trickleRate: 0.1,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routerChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

// Create a theme instance.
export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Monstserrat', 'Helvetica Neue', 'Arial', 'sans-serif'].join(
      ',',
    ),
  },
  palette: {
    primary: { main: '#02b42a' },
    error: {
      main: red.A400,
    },
    secondary: { main: '#37363A' },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 2,
      },
    },
    MuiTextField: {
      root: {
        borderRadius: 2,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 2,
      },
    },
  },
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>KIGT ChargeCloud</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
        </Head>
        {/* <Provider store={store}> */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <SWRConfig
            value={{
              fetcher: (url, headerValue) =>
                axios(url, {
                  headers: {
                    'Content-Type': 'application/json',
                    authorization: headerValue,
                  },
                }).then((r) => r.data),
            }}
          >
            <Container disableGutters maxWidth={false}>
              <Box marginTop={0}>
                <AuthProvider>
                  <NavProvider>
                    <ChargersProvider>
                      <SnackbarProvider>
                        <NotificationProvider>
                          <Component {...pageProps} />
                        </NotificationProvider>
                      </SnackbarProvider>
                    </ChargersProvider>
                  </NavProvider>
                </AuthProvider>
              </Box>
            </Container>
          </SWRConfig>
        </ThemeProvider>
        {/* </Provider> */}
      </React.Fragment>
    );
  }
}
