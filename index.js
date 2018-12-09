const url = 'https://www.realclearpolitics.com/epolls/json/6179_historical.js';

const express = require('express');
const csv = require('csv-express');
const app = express();

const rp = require('request-promise');

const getRCPTrumpJSON = async () => {
    const res = await rp(url);
    const trimmed = res.slice(12).slice(0, -2);
    const parsed = JSON.parse(trimmed).poll.rcp_avg;
    const mapped = parsed.map(({ date, candidate: [approve, disapprove] }) => ({
        date: new Date(date).toLocaleDateString(),
        approve: approve.value,
        disapprove: disapprove.value
    }));
    return mapped;
};

 
app.get('/', async (req, res) => {
    console.log(new Date().toLocaleString(), 'getting rcp trump json', req)
    const json = await getRCPTrumpJSON();
    console.log({ json})
    res.csv(json, true);
});
 
app.listen(3010);

