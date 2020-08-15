const express = require('express');
const path = require('path');
const app = express();

// Use the path ./react-build for searching static file 
app.use(express.static(path.join(__dirname, 'react-build')));
// Start serving at / 
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-build', 'index.html'));
});
app.listen(3001);