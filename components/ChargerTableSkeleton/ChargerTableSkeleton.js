import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});
const ChargerTableSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default ChargerTableSkeleton;
