require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const jsonMiddleware = express.json();
const jwt = require('jsonwebtoken');
const pg = require('pg');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_TEST);
const authMiddleware = require('./auth-middleware');

app.use(jsonMiddleware);
app.use(staticMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
         "name",
         "imageUrl",
         "price"
    from "snowboards"
    `;
  db.query(sql)
    .then(result => {
      const snowboards = result.rows;
      res.status(200).json(snowboards);
    })
    .catch(err => next(err));
});

app.get('/api/products/:id', (req, res, next) => {
  const sql = `
select   "name",
         "imageUrl",
         "price",
         "description",
         "profileName",
         "profileDescription",
         "flex",
         "shapeName",
         "shapeDescription",
         "edgeTechName",
         "edgeTechDescription",
         "abilityLevel",
         "terrain",
         array_agg("size") as sizes
    from "snowboards"
    join "shapes" using ("shapeId")
    join "edgeTech" using ("edgeTechId")
    join "profileTypes" using ("profileId")
    join "sizes" using ("productId")
   where "productId" = $1
   group by "productId", "profileName", "profileDescription", "shapeName", "shapeDescription", "edgeTechName", "edgeTechDescription"
  `;
  const params = [Number(req.params.id)];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        throw new ClientError(404, 'Product is not found.');
      }
      res.status(200).json(product);
    })
    .catch(err => next(err));
});

app.post('/api/products', (req, res, next) => {
  const token = req.get('X-Access-Token');
  if (!token) {
    const cartSql = `
      insert into "cart" ("purchased")
              values ('false')
      returning "cartId"
    `;
    db.query(cartSql)
      .then(result => {
        const cartId = result.rows[0];
        const payload = cartId;
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        const cartItem = req.body;
        const { productId, quantity, size } = cartItem;
        const sql = `
          insert into "cartItems" ("cartId", "productId", "quantity", "size")
          values ($1, $2, $3, $4)
          returning *
        `;
        const params = [payload.cartId, productId, quantity, size];
        db.query(sql, params)
          .then(result => {
            res.json({ token, cartItem: result.rows[0] });
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const cartId = payload.cartId;
    const cartItem = req.body;
    const { productId, quantity, size } = cartItem;
    const sql = `
      insert into "cartItems" ("cartId", "productId", "quantity", "size")
      values ($1, $2, $3, $4)
      returning *
    `;
    const params = [cartId, productId, quantity, size];
    db.query(sql, params)
      .then(result => {
        res.json({ token, cartItem: result.rows[0] });
      })
      .catch(err => next(err));
  }
});

app.get('/api/cart', (req, res, next) => {
  const token = req.get('X-Access-Token');
  if (!token) {
    return res.json([]);
  }
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  const cartId = payload.cartId;
  const sql = `
  select "productId",
         "name",
         "price",
         "size",
         "quantity",
         "imageUrl"
    from "cart"
    join "cartItems" using("cartId")
    join "snowboards" using("productId")
   where "cartId" = $1
`;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      const cartItems = result.rows;
      res.status(200).json(cartItems);
    })
    .catch(err => next(err));
});

app.use(authMiddleware);

app.patch('/api/increase/:id/:size', (req, res, next) => {
  const { cartId } = req.cartId;
  const productId = Number(req.params.id);
  const size = Number(req.params.size);
  const sql = `
    update "cartItems"
       set "quantity" = "quantity" + 1
     where "productId" = $1
       and "size" = $2
       and "cartId" = $3
  `;
  const params = [productId, size, cartId];
  db.query(sql, params)
    .then(result => {
      const sql = `
          select "productId",
            "name",
            "price",
            "size",
            "quantity",
            "imageUrl"
          from "cart"
          join "cartItems" using("cartId")
          join "snowboards" using("productId")
          where "cartId" = $1
      `;
      const params = [cartId];
      db.query(sql, params)
        .then(result => {
          const cartItems = result.rows;
          res.status(200).json(cartItems);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.patch('/api/decrease/:id/:size', (req, res, next) => {
  const { cartId } = req.cartId;
  const productId = Number(req.params.id);
  const size = Number(req.params.size);
  const sql = `
    update "cartItems"
       set "quantity" = "quantity" - 1
     where "productId" = $1
       and "size" = $2
       and "cartId" = $3
  `;
  const params = [productId, size, cartId];
  db.query(sql, params)
    .then(result => {
      const sql = `
          select "productId",
            "name",
            "price",
            "size",
            "quantity",
            "imageUrl"
          from "cart"
          join "cartItems" using("cartId")
          join "snowboards" using("productId")
          where "cartId" = $1
      `;
      const params = [cartId];
      db.query(sql, params)
        .then(result => {
          const cartItems = result.rows;
          res.status(200).json(cartItems);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/api/product/:id/:size', (req, res, next) => {
  const { cartId } = req.cartId;
  const productId = Number(req.params.id);
  const size = Number(req.params.size);
  const sql = `
    delete from "cartItems"
          where "productId" = $1
            and "size" = $2
            and "cartId" = $3
  `;
  const params = [productId, size, cartId];
  db.query(sql, params)
    .then(result => {
      const sql = `
          select "productId",
            "name",
            "price",
            "size",
            "quantity",
            "imageUrl"
          from "cart"
          join "cartItems" using("cartId")
          join "snowboards" using("productId")
          where "cartId" = $1
      `;
      const params = [cartId];
      db.query(sql, params)
        .then(result => {
          const cartItems = result.rows;
          res.status(200).json(cartItems);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/checkout', (req, res, next) => {
  const { cartId } = req.cartId;
  const checkoutInfo = req.body;
  const { email, firstName, lastName, address, address2, city, state, zip, total } = checkoutInfo;
  const sql = `
  insert into "customer" ("email", "firstName", "lastName", "address", "address2", "city", "state", "zip")
  values ($1, $2, $3, $4, $5, $6, $7, $8)
  returning *
  `;
  const params = [email, firstName, lastName, address, address2, city, state, zip];
  db.query(sql, params)
    .then(result => {
      const customer = result.rows[0];
      const { customerId } = customer;
      const sql = `
        insert into "orders" ("cartId", "customerId", "total")
        values ($1, $2, $3)
        returning *
      `;
      const params = [cartId, customerId, total];
      db.query(sql, params)
        .then(result => {
          const sql = `
          update "cart"
          set "purchased" = true
          where "cartId" = $1
          returning *
          `;
          const params = [cartId];
          db.query(sql, params)
            .then(result => res.json(result.rows[0]))
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.get('/api/cost', (req, res, next) => {
  const { cartId } = req.cartId;
  const sql = `
  select sum("price" * "quantity")
    from "snowboards"
    join "cartItems" using("productId")
    join "cart" using("cartId")
   where "cartId" = $1
  `;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      const costs = {};
      costs.subtotal = Number(result.rows[0].sum / 100);
      costs.taxes = Number((costs.subtotal * 0.0775).toFixed(2));
      costs.total = Number((costs.subtotal + (costs.taxes)).toFixed(2));
      res.json(costs);
    })
    .catch(err => next(err));
});

app.post('/create-payment-intent', async (req, res, next) => {
  const { cartId } = req.cartId;
  const sql = `
  select sum("price" * "quantity")
    from "snowboards"
    join "cartItems" using("productId")
    join "cart" using("cartId")
   where "cartId" = $1
  `;
  const params = [cartId];
  db.query(sql, params)
    .then(result => result.rows[0].sum)
    .then(result => {
      const subtotal = parseInt(result);
      const taxes = subtotal * 0.0775;
      const total = subtotal + taxes;
      return Math.trunc(total);
    })
    .then(result => {
      stripe.paymentIntents.create({
        amount: result,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true
        }
      })
        .then(paymentIntent => {
          res.send({
            clientSecret: paymentIntent.client_secret
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
