const express = require('express');
const connectDB = require('./Configs/db');

//const departmentsRouter = require('./controllers/departmentController');


const app = express();
const PORT = 3000;

connectDB();

app.use(cors());
app.use('/', express.json());

//app.use('/departments', departmentsRouter);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});