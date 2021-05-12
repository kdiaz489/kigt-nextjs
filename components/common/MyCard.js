import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 'auto',
    borderRadius: '16px',
  },

  cardContent: {
    minHeight: theme.spacing(15),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const MyCard = ({ title, children, type, align }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} variant='outlined'>
      <CardHeader title={title} align={align} variant='h6' />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MyCard;
