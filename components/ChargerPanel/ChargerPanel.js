import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ChargerDetails from './ChargerDetails';
import ChargerSettings from './ChargerSettings';
import TroubleShootForm from './TroubleShootForm';
import { useChargers } from '../../context/chargers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `charger-tab-${index}`,
    'aria-controls': `charger-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '10%',
  },
  tab: {
    color: 'white',
  },
  tabBackground: { backgroundColor: theme.palette.secondary.light },
  indicator: {
    backgroundColor: 'white',
  },
}));

export default function ChargerPanel(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { currentCharger, setCurrentCharger } = useChargers();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position='static'>
          <Tabs
            classes={{
              root: classes.tabBackground,
              indicator: classes.indicator,
            }}
            value={value}
            onChange={handleChange}
            aria-label='charger tabs'
          >
            <Tab className={classes.tab} label='Details' {...a11yProps(0)} />
            <Tab className={classes.tab} label='Settings' {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ChargerDetails currentCharger={currentCharger} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChargerSettings currentCharger={currentCharger} />
        </TabPanel>
      </div>
      <TroubleShootForm currentCharger={currentCharger} />
    </>
  );
}
