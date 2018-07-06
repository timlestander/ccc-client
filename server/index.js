const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
const config = require('./config');
const router = require('./router');
const seed = require('./seeds');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static('client'));
app.use(cors());

router.set(app);

sequelize
  .sync({ force: true })
  .then(() => {
    seed();
  })
  .then(() => {
    app.listen(config.port, () => {
      console.log('**********************************');
      console.log('*** Now Listening on port 3000 ***');
      console.log('**********************************');
    });
  });
