const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/db');

//const membersRouter = require('./Controllers/membersController');

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use('/', express.json());

//app.use('/members', membersRouter);


app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});