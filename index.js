const express = require('express');
const app = express();
const { envelopes } = require('./data');
const cors = require('cors');
const bodyParser = require('body-parser');


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// GET - All envelopes
app.get('/api/envelopes',(req, res) => {
    res.status(200).json(envelopes)
});


// GET - a single envelope
app.get('/api/envelopes/:id',(req, res) => {
    const id = Number(req.params.id);
    const singleEnvelope = envelopes.find((envelope) => envelope.id === id);
    if(!singleEnvelope){
        res.status(404).send({success: false, message:`Envelope Number ${id} doesn't exist`});
    }
    res.json(singleEnvelope);
});

// PUT - Update a single envelope
app.put('/api/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
    const { category, totalAmount, spendingLimit } = req.body;

    if(typeof category !== 'string' || typeof totalAmount !== 'number' || typeof spendingLimit !== 'number'){
        res.status(400).send({success: false, message: 'Not all keys are present!'});
    }

    if(totalAmount < 0 || spendingLimit < 0 ){
        res.status(400).send({success: false, message: 'Negative numbers in the as saveAmount or total not allowed!'});
    }
})

// Throw Error for wrong url
app.get('*', (req, res) => {
    res.status(404).send('No Content')
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})