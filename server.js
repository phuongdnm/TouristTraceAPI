require('dotenv').config();

const express = require('express');
const userRouter = require('./api/users/user.router');

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
 
const port = (process.env.NODE_ENV === 'development') ? 8080: process.env.PORT;

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
