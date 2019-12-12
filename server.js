require('dotenv').config();

const express = require('express');

const app  = express();

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working!'
  })
})

const port = process.env.PORT | 8080;
app.listen(port, () => {
  console.log('Server is running on port ', port);
})