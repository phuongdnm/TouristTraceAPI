const express = require('express');

const app  = express();

app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working!'
  })
})

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})