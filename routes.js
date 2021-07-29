const express = require('express');
const router = express.Router();
const { envelopes, envelopeID } = require('./data');
const bodyParser = require('body-parser');


// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


// GET - All envelopes
router.get('/api/envelopes', (req, res) => {
    res.status(200).json(envelopes)
});

// GET - a single envelope
router.get('/api/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
    const singleEnvelope = envelopes.find((envelope) => envelope.id === id);
    if (!singleEnvelope) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    }
    res.json(singleEnvelope);
});

router.post('/api/envelopes', (req, res) => {
    const { category, totalAmount, spendingLimit } = req.body;

    if (typeof category !== 'string' || typeof totalAmount !== 'number' || typeof spendingLimit !== 'number') {
        res.status(400).send({
            success: false,
            message: 'Not all keys are present!'
        });
    }

    if (totalAmount < 0 || spendingLimit < 0) {
        res.status(400).send({
            success: false,
            message: 'Negative numbers are not allowed'
        });
    }

    envelopes.push({ id:envelopes.length + 1, category, totalAmount, spendingLimit });
    res.status(200).json({ success: true, message: envelopes })

})

// PUT - Update a single envelope
// router.put('/api/envelopes/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const { category, totalAmount, spendingLimit } = req.body;

//     if(typeof category !== 'string' || typeof totalAmount !== 'number' || typeof spendingLimit !== 'number'){
//         res.status(400).send({success: false, message: 'Not all keys are present!'});
//     }

//     if(totalAmount < 0 || spendingLimit < 0 ){
//         res.status(400).send({success: false, message: 'Negative numbers are not allowed'});
//     }

//     envelopes.push({ category, totalAmount, spendingLimit });
//     res.status(200).json(envelopes);
// })


// Throw Error for a wrong url
router.get('*', (req, res) => {
    res.status(404).send('No Content')
})

module.exports = router