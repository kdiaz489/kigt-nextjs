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
    backgroundColor: '#f5f5f5',
  },
}));

const NavWrapper = (props) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie.includes('auth')) {
                window.location.href = "/"
              }
            `,
          }}
        />
      </Head>
      <div className={classes.root}>
        <Nav {...props} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default NavWrapper;
