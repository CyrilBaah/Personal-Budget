const express = require('express');
const router = express.Router();
const {
    envelopes
} = require('./data');
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

// POST - Create a new envelope
router.post('/api/envelopes', (req, res) => {
    const {
        category,
        totalAmount,
        spendingLimit
    } = req.body;

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

    envelopes.push({
        id: envelopes.length + 1,
        category,
        totalAmount,
        spendingLimit
    });
    res.status(200).json({
        success: true,
        message: envelopes
    })

})

// PUT - To withdraw from an envelope
router.put('/api/envelopes/:id/withdraw/:amount', (req, res) => {
    const id = Number(req.params.id);
    const amount = Number(req.params.amount)

    const envelopeID = envelopes.find((envelope) => envelope.id === id);

    if (!envelopeID) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    }

    if (envelopeID.totalAmount > amount) {
        envelopeID.totalAmount -= amount;
        res.status(200).json(envelopeID);
    } else {
        console.log('wrong');
    }
});

// PUT - To withdraw from an envelope
router.put('/api/envelopes/:id/deposit/:amount', (req, res) => {
    const id = Number(req.params.id);
    const amount = Number(req.params.amount)

    const envelopeID = envelopes.find((envelope) => envelope.id === id);

    if (!envelopeID) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    }

    envelopeID.totalAmount += amount;
    res.status(200).json(envelopeID);

});

// PUT - Update a single envelope
router.put('/api/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);
    const {
        category,
        totalAmount,
        spendingLimit
    } = req.body;

    const envelope = envelopes.find((envelope) => envelope.id === id);

    if (!envelope) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    }

    envelope.id = id,
        envelope.category = category;
    envelope.totalAmount = totalAmount;
    envelope.spendingLimit = spendingLimit;

    res.status(200).json({
        success: true,
        message: envelopes
    })
});

router.delete('/api/envelopes/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = envelopes.findIndex((envelope) => envelope.id === id);

    if (index === -1) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    } else {
        const result = envelopes.splice(index, 1);
        res.status(200).json({
            success: true,
            message: result
        })
    }
})


router.put('/api/envelopes/:id/transfer/:amount/transferId/:recieverId', (req, res) => {
    const id = Number(req.params.id)
    const amount = Number(req.params.amount)
    const recieverId = Number(req.params.recieverId)

    const envelope = envelopes.find((envelope) => envelope.id === id);
    console.log(envelope);
    if (!envelope) {
        res.status(404).send({
            success: false,
            message: `Envelope Number ${id} doesn't exist`
        });
    } else{
        envelope.totalAmount -= amount;

        const recieverEnvelope = envelopes.find((envelope) => envelope.id === recieverId);
        recieverEnvelope.totalAmount += amount;
        res.status(200).json({
            success: true,
            message: recieverEnvelope
        })
    }
})


// Throw Error for a wrong url
router.get('*', (req, res) => {
    res.status(404).send('No Content')
})

module.exports = router