
const express = require('express');
const csv = require('csv-express');
const app = express();

const getRCP = require('./getRCP');
const get538 = require('./get538');

app.get('/', (req, res) => res.sendFile(__dirname + '/home.html'));

app.get('/rcp.csv', async (req, res) => {
    console.log(new Date().toLocaleString(), 'getting rcp trump json')
    const json = await getRCP();
    res.csv(json, true);
});

app.get('/538.csv', async (req, res) => {
    const includeFuture = req.query.includeFuture !== undefined;
    console.log(new Date().toLocaleString(), 'getting 538 trump json', { includeFuture })
    const json = await get538(includeFuture);
    res.csv(json, true);
});
 
 
app.listen(3010);