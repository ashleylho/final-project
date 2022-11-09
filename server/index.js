require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const app = express();

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
  select "name",
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
         "size"
    from "snowboards"
    join "shapes" using ("shapeId")
    join "edgeTech" using ("edgeTechId")
    join "profileTypes" using ("profileId")
    join "sizes" using ("productId")
   where "productId" = $1;
  `;
  const params = [Number(req.params.id)];
  db.query(sql, params)
    .then(result => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
