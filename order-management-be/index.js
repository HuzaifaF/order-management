const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const ordersRouter = require('./routes/orders');
console.log('4');

console.log('5');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
