module.exports.validateParam = function (param, allowedNull = false) {
    if (param === null)
        if (allowedNull) return;
        else throw Error('Time element must be a valid number');

    const isInvalid = typeof param !== 'number' && !Number.isNaN(seconds);

    if (isInvalid) {
        throw Error('Time element must be a valid number');
    }
};
