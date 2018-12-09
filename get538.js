const rp = require('request-promise');

function findTextAndReturnRemainder(target, variable){
    var chopFront = target.substring(target.search(variable)+variable.length,target.length);
    var result = chopFront.substring(0,chopFront.search(";"));
    return result;
}

const get538 = async (includeFuture) => {
    const res = await rp('https://projects.fivethirtyeight.com/trump-approval-ratings/');
    const approvalText = findTextAndReturnRemainder(res, "var approval=");
    let json = JSON.parse(approvalText);
    console.log({ includeFuture }, 'here')
    if (!includeFuture) {
        json = json.filter(o => !o.future)
    }
    const mapped = json.map(obj => ({
        date: new Date(obj.date).toLocaleDateString(),
        approve: obj.approve_estimate,
        ...includeFuture && {
            approveHi: obj.approve_hi,
            approveLow: obj.approve_lo
        },
        disapprove: obj.disapprove_estimate,
        ...includeFuture && {
            disapproveHi: obj.disapprove_hi,
            disapproveLo: obj.disapprove_lo
        },
    }));
    console.log(mapped);
    return mapped;
};


module.exports = get538;