const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/db');

const usersRouter = require('./Controllers/usersController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use('/', express.json());

app.use('/users', usersRouter);


app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});