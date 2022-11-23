const limitTime = (module.exports.limitTime = function (sec) {
    if (sec > 359999) return 359999;
    else if (sec < -359999) return -359999;
});

const convertSecondsToHoursUnit = (module.exports.convertSecondsToHoursUnit =
    function (sec) {
        return (res = ~~(sec / 60 / 60));
    });

const convertSecondsToMinutesUnit =
    (module.exports.convertSecondsToMinutesUnit = function (sec) {
        return ~~((sec / 60) % 60);
    });

const convertSecondsToSecondsUnit =
    (module.exports.convertSecondsToSecondsUnit = function (sec) {
        return ~~((sec % 60) % 60);
    });

const timeParamsToTotalSeconds = (module.exports.timeParamsToTotalSeconds =
    function ({ seconds, minutes, hours } = {}) {
        seconds = seconds ?? 0;
        minutes = minutes ?? 0;
        hours = hours ?? 0;

        const result = seconds + minutes * 60 + hours * 3600;
        return limitTime(result);
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

const hoursToTotalSeconds = (module.exports.hoursToTotalSeconds = function (
    hours
) {
    return (hours % 100) * 3600;
});

const minutesToTotalSeconds = (module.exports.minutesToTotalSeconds = function (
    minutes
) {
    return minutes * 60;
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
