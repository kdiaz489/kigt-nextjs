import { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ChargerDetails from '../../components/ChargerManage/ChargerDetails';
import ChargerSettings from '../../components/ChargerManage/ChargerSettings';
import NavWrapper from '../../components/NavWrapper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}>
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
  paper: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    marginBottom: '10%',
  },

  tabBackground: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid #e8e8e8',
  },
  font: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

export default function ChargerManage2(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NavWrapper>
      <Paper className={classes.paper} elevation={0}>
        <Tabs
          classes={{
            root: classes.tabBackground,
          }}
          centered
          textColor='primary'
          value={value}
          onChange={handleChange}
          aria-label='charger tabs'>
          <Tab
            label='Details'
            classes={{ root: classes.font }}
            {...a11yProps(0)}
          />
          <Tab
            label='Settings'
            classes={{ root: classes.font }}
            {...a11yProps(1)}
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <ChargerDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChargerSettings />
        </TabPanel>
      </Paper>
      <Box p={3}>{/* <TroubleShootForm currentCharger={data} /> */}</Box>
    </NavWrapper>
  );
}
