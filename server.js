require('./connection');
const express = require('express');
const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
