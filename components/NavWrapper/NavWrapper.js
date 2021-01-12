import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Nav from '../Nav';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
  },
}));

const NavWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie.includes('token')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <div className={classes.root}>
        <Nav />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </>
  );
};

export default NavWrapper;
