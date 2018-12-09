const rp = require('request-promise');
const url = 'https://www.realclearpolitics.com/epolls/json/6179_historical.js';

const getRCP = async () => {
    const res = await rp(url);
    const trimmed = res.slice(12).slice(0, -2);
    const parsed = JSON.parse(trimmed).poll.rcp_avg;
    const mapped = parsed.map(({ date, candidate: [approve, disapprove] }) => ({
        date: new Date(date).toLocaleDateString(),
        approve: approve.value,
        disapprove: disapprove.value
    }));
    return mapped.reverse();
};

module.exports = getRCP;