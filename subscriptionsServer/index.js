const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/db');
const initializeData = require('./Utils/initializeData');

const membersRouter = require('./Controllers/membersController');
const moviesRouter = require('./Controllers/moviesController');
const subscriptionsRouter = require('./Controllers/SubscriptionsController');

const app = express();
const PORT = 8000;

connectDB().then(async () =>{
  console.log('Connected to MongoDB');

  await initializeData();

});

app.use(cors());
app.use('/', express.json());

app.use('/members', membersRouter);
app.use('/movies', moviesRouter);
app.use('/subscriptions', subscriptionsRouter);


app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});