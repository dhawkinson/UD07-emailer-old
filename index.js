'ues strict';

const express = require('express');
const app     = express();              //  NOTE: to self this is an instance of an express application - named 'app'

app.get('/', (req, res) => {
    res.send( { hi: 'there' } );
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);