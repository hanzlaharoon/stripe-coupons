import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import AddCoupon from './AddCoupon';
// import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar({ welcome = false, fectchCoupons }) {
  const classes = useStyles();
  //   const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Stripe-Coupons
          </Typography>

          {!welcome && (
            <>
              <Box margin={1}>
                {/* <Button variant='contained'>Add new Coupon</Button> */}
                <AddCoupon fectchCoupons={fectchCoupons} />
              </Box>
              <Button
                color='secondary'
                variant='outlined'
                onClick={() => {
                  //   history.push('/login')
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
