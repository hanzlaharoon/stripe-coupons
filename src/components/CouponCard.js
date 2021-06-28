import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CouponCard = ({
  coupon: { id, name, percent_off, duration, duration_in_months },
  fectchCoupons,
}) => {
  const classes = useStyles();

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(baseUrl + `coupons/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res) => {
        console.log('coupon/delete ', res);
        fectchCoupons();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {name || id}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {`${percent_off}% OFF`}
          </Typography>
          {duration !== 'repeating' && <Typography variant='body2' component='p'>
            {`Duration: ${duration}`}
          </Typography>}
          {duration === 'repeating' && <Typography variant='body2' component='p'>
            {`Duration: ${duration} - ${duration_in_months} Months`}
          </Typography>}
        </CardContent>
        <CardActions>
          <Grid container justify='flex-end'>
            <Grid item>
              <IconButton
                aria-label='add to favorites'
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default CouponCard;
