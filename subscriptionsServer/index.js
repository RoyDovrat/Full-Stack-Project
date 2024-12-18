const express = require('express');
const cors = require('cors');
const connectDB = require('./Configs/db');
const initializeData = require('./Utils/initializeData');

//const departmentsRouter = require('./controllers/departmentController');


const app = express();
const PORT = 3000;

connectDB().then(async () =>{
  console.log('Connected to MongoDB');

  await initializeData();

});

app.use(cors());
app.use('/', express.json());

//app.use('/departments', departmentsRouter);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});