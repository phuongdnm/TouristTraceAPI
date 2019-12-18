require('dotenv').config();

const express = require('express');
const userRouter = require('./api/users/user.router');

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);
 
const port = (process.env.NODE_ENV === 'production') ? process.env.PORT : 8080;

app.listen(port, () => {
  console.log('Server is running on port ', port);
});
