require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const jsonMiddleware = express.json();
const jwt = require('jsonwebtoken');
const pg = require('pg');
const app = express();

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
  select "name",
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

app.post('/api/personalinfo', (req, res, next) => {
  const token = req.get('X-Access-Token');
  const personalInfo = req.body;
  const { email, firstName, lastName, address, address2, city, state, zip } = personalInfo;
  if (!token) {
    throw new ClientError(404, 'Cart was not found.');
  }
  const sql = `
  insert into "customer" ("email", "firstName", "lastName", "address", "address2", "city", "state", "zip")
  values ($1, $2, $3, $4, $5, $6, $7, $8)
  returning *
  `;
  const params = [email, firstName, lastName, address, address2, city, state, zip];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
