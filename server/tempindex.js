const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
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
app.use(express.static(path.join(__dirname, '/../dist/ccc/')));
app.use(cors());

router.set(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/ccc/index.html'));
});

app.listen(config.port, () => {
  console.log('NOW LISTENENRREIN');
});

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     seed();
//   })
//   .then(() => {
//     app.listen(config.port, () => {
//       console.log('**********************************');
//       console.log('*** Now Listening on port 3000 ***');
//       console.log('**********************************');
//     });
//   });
