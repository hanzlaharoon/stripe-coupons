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

module.exports = router;
