const express = require('express');
const app = express();
const { envelopes } = require('./data');



app.get('/api/envelopes',(req, res) => {
    res.json(envelopes)
});

app.get('/api/envelopes/:id',(req, res) => {
    const id = Number(req.params.id);
    const singleEnvelope = envelopes.find((envelope) => envelope.id === id);
    if(!singleEnvelope){
        res.status(404).send(`Envelope Number ${singleEnvelope} doesn't exist`);
    }
    res.json(singleEnvelope);
});



app.get('*', (req, res) => {
    res.status(404).send('No Content')
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})