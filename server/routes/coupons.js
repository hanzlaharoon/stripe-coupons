var express = require('express');
var router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_TEST);
const cors = require('./cors');

/* GET coupons list */
router
  .route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, async function (req, res, next) {
    const coupons = await stripe.coupons.list({
      limit: 10,
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(coupons);
  });

/* Create a coupons */
router
  .route('/coupon')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, async function (req, res, next) {
    /* const couponsParams = {
      name: req.body.name,
      percent_off: req.body.percent_off,
      duration: req.body.duration,
      duration_in_months: req.body.duration_in_months,
    }; */
    try {
      const coupon = await stripe.coupons.create(req.body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(coupon);
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.json(error.message);
    }
  })
  .delete(cors.corsWithOptions, async function (req, res, next) {
    try {
      const coupon = await stripe.coupons.del(req.body.id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(coupon);
    } catch (error) {
      res.statusCode = 400;
      //   res.setHeader('Content-Type', 'application/json');
      // res.json(error.message);
      res.end(error.message);
    }
  });

module.exports = router;
