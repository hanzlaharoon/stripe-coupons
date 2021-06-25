import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import Navbar from './Navbar';
import CouponCard from './CouponCard';
import { baseUrl } from '../shared/baseUrl';

const Home = () => {
  const [couponList, setcouponList] = useState();

  // Populate Data
  useEffect(() => {
    fectchCoupons();

    // axios
    //   .post(baseUrl + 'coupons/addcoupon/')
    //   .then((res) => {
    //     console.log('/coupons/addcoupon', res);
    //     setcouponList(res.data.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  function fectchCoupons() {
    axios
      .get(baseUrl + 'coupons/')
      .then((res) => {
        console.log('/coupons', res);
        setcouponList(res.data.data);
      })
      .catch((err) => console.log(err));
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
          {couponList &&
            couponList.map((coupon) => (
              <Grid key={coupon.id} item xs={12} sm={6} md={3}>
                <CouponCard
                  // key={coupon.id}
                  coupon={coupon}
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
