const url = 'https://www.realclearpolitics.com/epolls/json/6179_historical.js';
const rp = require('request-promise');

(async () => {

    const res = await rp(url);
    console.log(res);

})();