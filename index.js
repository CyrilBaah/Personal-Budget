const express = require('express');
const app = express();
const envelopeRoutes = require('./routes');

// Routes: /api/envelopes
app.use('/', envelopeRoutes);

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})