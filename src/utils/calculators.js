module.exports.convertSecondsToHoursUnit = function (sec) {
    return ~~(sec / 60 / 60);
};

module.exports.convertSecondsToMinutesUnit = function (sec) {
    return ~~((sec / 60) % 60);
};

module.exports.convertSecondsToSecondsUnit = function (sec) {
    return ~~((sec % 60) % 60); // todo: check this logic
};

// todo: check to timeUnits
const timeParamsToTotalSeconds = (module.exports.timeParamsToTotalSeconds =
    function ({ seconds, minutes, hours } = {}) {
        seconds = seconds ?? 0;
        minutes = minutes ?? 0;
        hours = hours ?? 0;

        return seconds + minutes * 60 + hoursToTotalSeconds(hours);
    });

module.exports.currentTimeToTotalSeconds = function () {
    const now = new Date();

    return timeParamsToTotalSeconds({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    });
};

const hoursToTotalSeconds = (module.exports.hoursToTotalSeconds = function (
    hours
) {
    return (hours % 100) * 3600;
});

// todo: same as hoursToTotalSeconds in timeParamsToTotalSeconds
module.exports.minutesToTotalSeconds = function (minutes) {
    return minutes * 60;
};

// todo: check to remove this function or insert to corect class
module.exports.countDown = function (start, total) {
    const intervalID = setInterval(() => {
        if (start === false || total === 0) {
            clearInterval(intervalID);
            return total;
        } else total--;
    }, 1000);
};
