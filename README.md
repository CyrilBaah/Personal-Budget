# Personal-Budget
An API that allows clients to create and manage a personal budget.
Using Envelope [Enveloping Budgeting](https://www.thebalance.com/what-is-envelope-budgeting-1293682),
The API allow users to manage budget envelopes and track the balance of each envelope.

# Routes
* **GET** `/api/envelopes/` Get all single envelopes
* **GET** `/api/envelopes/:id` Get a single envelope
* **POST** `/api/envelopes/` Add a new envelope
* **PUT** `/api/envelopes/:id/withdraw/:amount` Withdraw from a specific envelope
* **PUT** `/api/envelopes/:id/deposit/:amount` Deposit into a specific envelope
* **PUT** `/api/envelopes/:id` Update a single envelope 
* **DELETE** `/api/envelopes/:id` Delete a single envelope 
* **PUT** `/api/envelopes/:id/transfer/:amount/transferId/:recieverId` Transfer amount from one envelope to another
