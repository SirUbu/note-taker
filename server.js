// require dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// assign the port is present or default
const PORT = process.env.PORT || 3001;

// using express.js to create the server
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// run server on port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});