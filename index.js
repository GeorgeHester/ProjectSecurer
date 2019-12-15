const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authroutes = require('./routes/auth');
const accountroutes = require('./routes/account');

dotenv.config();

mongoose.connect(process.env.db_connect, { useUnifiedTopology: true, useNewUrlParser: true },
() => console.log('[ Database: Connected ]'));

app.use(express.json());

app.use('/api/user', authroutes);
app.use('/api/user', accountroutes);

app.listen(process.env.PORT || 3000, function () {
    console.log('[ Port: %d ][ Mode: %s ]', this.address().port, app.settings.env);
});

/*" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"*/