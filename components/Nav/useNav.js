import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Divider from '@material-ui/core/Divider';
import avatar from '../../img/avatar.svg';

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

const DrawerNav = (props) => {
  const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.drawer);
  const theme = useTheme();
  let location = useLocation();
  const { pathname } = location;
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerOpen = () => {
    // dispatch(setOpen(true));
  };

  const handleDrawerClose = () => {
    // dispatch(setOpen(false));
  };

  const drawerContent = (
    <div>
      <div className={classes.toolbar}>
        <List>
          <ListItem alignItems='center' classes={{ root: classes.logo }}>
            <img
              src='https://static.wixstatic.com/media/4f9eed_f8416114f19c487bbbc644416e6448b6~mv2.png/v1/fill/w_110,h_36,al_c,q_85,usm_0.66_1.00_0.01/4f9eed_f8416114f19c487bbbc644416e6448b6~mv2.webp'
              alt='Logo'
              width='130px'
              height='auto'
            />
          </ListItem>

          <ListItem alignItems='center' classes={{ root: classes.logo }}>
            <Avatar src={avatar} className={classes.large} />
          </ListItem>

          <ListItem className={classes.userName}>
            <ListItemText
              primary={user ? user.name : ''}
              classes={{ primary: classes.userName }}
            />
          </ListItem>

          <Divider />

          <Link
            to='/dashboard'
            underline='none'
            component={RouterLink}
            className={classes.link}
          >
            <ListItem
              selected={pathname === '/dashboard'}
              button
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
              <ListItemText
                primary={'Dashboard'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>

          <ListItem
            button
            className={classes.listItem}
            classes={{ root: classes.listItem, selected: classes.selected }}
          >
            <ListItemText
              primary={'Account'}
              classes={{ primary: classes.listItemText }}
            />
          </ListItem>
          <Link component={RouterLink} underline='none' to='/throttlePage'>
            <ListItem
              button
              className={classes.listItem}
              selected={pathname === '/throttlePage'}
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
              <ListItemText
                primary={'Throttle Page'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>

          <ListItem
            button
            onClick={() => dispatch(logout())}
            className={classes.listItem}
          >
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
        classes={{ colorPrimary: classes.appBarColor }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={handleDrawerClose}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className={classes.drawer}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default DrawerNav;
