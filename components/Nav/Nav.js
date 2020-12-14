import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebaseClient } from '../../firebaseClient';
import Button from '@material-ui/core/Button';
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
  // const { user } = useSelector((state) => state.auth);
  const classes = useStyles();
  // const dispatch = useDispatch();
  // const { open } = useSelector((state) => state.drawer);
  const theme = useTheme();
  const pathname = router.pathname;

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // const handleDrawerOpen = () => {
  //   dispatch(setOpen(true));
  // };

  // const handleDrawerClose = () => {
  //   dispatch(setOpen(false));
  // };

  const drawerContent = (
    <div>
      <div className={classes.toolbar}>
        <List>
          <ListItem className={classes.userName}>
            <ListItemText
              primary={'TEST'}
              classes={{ primary: classes.userName }}
            />
          </ListItem>

          <Divider />

          <Link href='/dashboard' underline='none' className={classes.link}>
            <ListItem
              selected={pathname === '/dashboard'}
              button
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
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
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
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

          {/* <Link underline='none' href='/support'>
            <ListItem
              button
              className={classes.listItem}
              selected={pathname === '/support'}
              classes={{ root: classes.listItem, selected: classes.selected }}
            >
              <ListItemText
                primary={'Support'}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link> */}

          <ListItem
            button
            onClick={async () => {
              await firebaseClient.auth().signOut();
              router.push('/', undefined, { shallow: true });
            }}
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
        <Toolbar variant='dense'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => console.log('open')}
            edge='start'
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Button style={{ color: 'white' }}>Test</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={false}
            onClose={() => console.log('closed')}
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

export default Nav;
