module.exports.validateParam = function (param, allowedNull = false) {
    if (param === null && allowedNull) return;

    if (typeof param !== 'number') {
        throw Error('Time element must be a valid number');
    }
};
