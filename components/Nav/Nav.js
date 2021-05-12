import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebaseClient } from '../../firebaseClient';
import { useAuth } from '../../context/auth';
import { useNav } from '../../context/nav';
import Logo from '../../public/img/KIGT_Logo.svg';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  link: {},
  listItem: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: 'black',
    },
  },
  selected: {
    '&:hover': {
      color: '#000',
    },
  },
  userName: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
    fontWeight: '600',
  },
  listItemText: {
    fontSize: '1.1em',
  },
  logo: {
    justifyContent: 'center',
    color: 'white',
    padding: '5%',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },

  root: {
    display: 'flex',
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow: 'none',
  },

  appBarColor: {
    backgroundColor: theme.palette.primary.light,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    color: 'white',
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'white',
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Nav = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const pathname = router.pathname;
  const { user, signout } = useAuth();
  const [open, toggleOpen] = useNav();
  const { window } = props;
  const { backButton } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <div>
      <div className={classes.toolbar}>
        <List>
          <ListItem alignItems='center' classes={{ root: classes.logo }}>
            <Logo style={{ width: '50%', height: 'auto' }} />
          </ListItem>
          <Divider />
          <ListItem className={classes.userName}>
            <ListItemText
              primary={
                user !== null && user.displayName !== null
                  ? user.displayName
                  : 'User'
              }
              classes={{ primary: classes.userName }}
            />
          </ListItem>
          <Divider />
          <Link href='/dashboard' underline='none' className={classes.link}>
            <ListItem
              selected={pathname === '/dashboard'}
              button
              classes={{ root: classes.listItem, selected: classes.selected }}>
              <ListItemText
                primary={'Home'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>

          <Link underline='none' href='/account'>
            <ListItem
              button
              className={classes.listItem}
              selected={pathname === '/account'}
              classes={{ root: classes.listItem, selected: classes.selected }}>
              <ListItemText
                primary={'Account'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>

          {/* <Link underline='none' href='/throttle'>
            <ListItem
              button
              className={classes.listItem}
              selected={pathname === '/throttle'}
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
              <ListItemText
                primary={'Throttle'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link> */}

          <ListItem
            button
            onClick={async () => {
              await signout();
            }}
            className={classes.listItem}>
            <ListItemText
              primary={'Sign Out'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={classes.appBar}
        classes={{ colorPrimary: classes.appBarColor }}>
        <Toolbar variant='dense'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleOpen}
            edge='start'
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {backButton && (
            <Button
              style={{ color: 'white' }}
              startIcon={<ArrowBackIcon />}
              onClick={() => router.back()}>
              Back
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={toggleOpen}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className={classes.drawer}>
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open>
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Nav;
