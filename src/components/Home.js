import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Navbar from './Navbar';
import CouponCard from './CouponCard';
import { baseUrl } from '../shared/baseUrl';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = () => {
  const [couponList, setcouponList] = useState();
  const [loading, setLoading] = useState(true);
  // Populate Data
  useEffect(() => {
    fectchCoupons();
  }, []);

  function fectchCoupons() {
    setLoading(true);
    axios
      .get(baseUrl + 'coupons/')
      .then((res) => {
        console.log('/coupons', res);
        setcouponList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function toggleFavoritePlace(value, id) {
    // axios
    //   .put(baseUrl + `places/place/${id}/`, {
    //     favorite: value,
    //   })
    //   .then((res) => {
    //     console.log(`places/place/${id}/`, res);
    //   })
    //   .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar fectchCoupons={fectchCoupons} />

      <Box padding={1} margin={1}>
        <Typography variant='h4'>Coupons</Typography>
      </Box>

      <Box padding={1} margin={1}>
        <Grid container spacing={4}>
          {loading && (
            <Grid container item sm={12} justify='center'>
              <CircularProgress />
            </Grid>
          )}
          {couponList &&
            couponList.map((coupon) => (
              <Grid key={coupon.id} item xs={12} sm={6} md={3}>
                <CouponCard
                  // key={coupon.id}
                  coupon={coupon}
                  fectchCoupons={fectchCoupons}
                  toggleFavorite={toggleFavoritePlace}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
