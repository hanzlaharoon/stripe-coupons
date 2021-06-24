var express = require('express');
var router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_TEST);

/* GET coupons list */
router.get('/', async function (req, res, next) {
  const coupons = await stripe.coupons.list({
    limit: 10,
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(coupons);
});

module.exports = router;
