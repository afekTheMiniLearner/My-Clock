const Time = require('../time');

const totalSecondsToHours = (module.exports.totalSecondsToHours = function (
    sec
) {
    const res = ~~(sec / 60 / 60);
    return res;
});

//convert change name
const totalSecondsToMinutes = (module.exports.totalSecondsToMinutes = function (
    sec
) {
    return ~~((sec / 60) % 60);
});

const totalSecondsToSeconds = (module.exports.totalSecondsToSeconds = function (
    sec
) {
    return ~~((sec % 60) % 60);
});

const timeParamsToTotalSeconds = (module.exports.timeParamsToTotalSeconds =
    function ({ seconds, minutes, hours } = {}) {
        seconds = seconds ?? 0;
        minutes = minutes ?? 0;
        hours = hours ?? 0;
        const result = seconds + minutes * 60 + hours * 3600;

        return result < 0 ? result % -360000 : result % 360000;
    });

const currentTimeToTotalSeconds = (module.exports.currentTimeToTotalSeconds =
    function () {
        const now = new Date();

        return timeParamsToTotalSeconds({
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        });
    });

// todo change to += difference

const setHours = (module.exports.setHours = function (time, setHours) {
    return setHours < 0
        ? seconds + setHours * 3600 + totalSecondsToHours(seconds) * 3600
        : seconds + setHours * 3600 - totalSecondsToHours(seconds) * 3600;
});

const setHoursOld = (module.exports.setHours = function (seconds, setHours) {
    return setHours < 0
        ? seconds + setHours * 3600 + totalSecondsToHours(seconds) * 3600
        : seconds + setHours * 3600 - totalSecondsToHours(seconds) * 3600;
});

const setMinutes = (module.exports.setMinutes = function (seconds, setMinutes) {
    // change to minutes
    return setMinutes < 0
        ? seconds + setMinutes * 60 + totalSecondsToMinutes(seconds) * 60
        : seconds + setMinutes * 60 - totalSecondsToMinutes(seconds) * 60;
});

const setSeconds = (module.exports.setSeconds = function (seconds, setSeconds) {
    return setSeconds < 0
        ? seconds + setSeconds + totalSecondsToSeconds(seconds)
        : seconds + setSeconds - totalSecondsToSeconds(seconds);
});

const addHoursToTotalSeconds = (module.exports.addHoursToTotalSeconds =
    function (seconds, num) {
        return seconds + (num % 100) * 3600;
    });

const addMinutesToTotalSeconds = (module.exports.addMinutesToTotalSeconds =
    function (seconds, num) {
        return seconds + num * 60;
    });

const addSecondsToTotalSeconds = (module.exports.addSecondsToTotalSeconds =
    function (seconds, num) {
        return seconds + num;
    });

const timeLimitCheck = (module.exports.timeLimitCheck = function (seconds) {
    return seconds > 0 ? seconds % 360000 : seconds % -360000;
});

const countDown = (module.exports.countDown = function (start, total) {
    const intervalID = setInterval(() => {
        if (start === false || total === 0) {
            clearInterval(intervalID);
            return total;
        } else total--;
    }, 1000);
});

module.exports = {
    totalSecondsToHours,
    totalSecondsToMinutes,
    totalSecondsToSeconds,
    timeParamsToTotalSeconds,
    currentTimeToTotalSeconds,
    setHours,
    setMinutes,
    setSeconds,
    addHoursToTotalSeconds,
    addMinutesToTotalSeconds,
    addSecondsToTotalSeconds,
    timeLimitCheck,
    countDown,
};
