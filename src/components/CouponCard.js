import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, makeStyles } from '@material-ui/core';
// import FavoriteIcon from '@material-ui/icons/Favorite';

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
  coupon: { id, name, percent_off, duration, favorite },
  toggleFavorite,
}) => {
  const classes = useStyles();
  const [isFav, setIsFav] = useState(favorite);
  const handleClickFav = (isFav, id) => {
    // toggleFavorite(!isFav, id);
    // setIsFav(!isFav);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            {`${percent_off} percent off`}
          </Typography>
          <Typography variant='body2' component='p'>
            {`Duration: ${duration}`}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label='add to favorites'
            onClick={() => handleClickFav(isFav, id)}
          >
            {/* <FavoriteIcon color={isFav ? 'secondary' : 'disabled'} /> */}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default CouponCard;
