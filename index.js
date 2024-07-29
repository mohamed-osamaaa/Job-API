require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const statusError = require('./utels/StatusError.js');


const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;
const URL_Mongo = process.env.URL_Mongo;


mongoose.connect(URL_Mongo).then(() => {
    console.log('mongodb server started\n');
});

app.use(cors());
app.use(express.json());
const routerJob = require('./router/router.job.js');
const routerUser = require('./router/router.user.js');
app.use('/api/jobs', routerJob);
app.use('/api/user', routerUser);


app.all('*', (req, res, next) => {
    return res.status(404).json({ status: statusError.ERROR, message: 'this resource is not available' });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || statusError.ERROR, message: error.message, code: error.statusCode || 500, data: null });
});



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
