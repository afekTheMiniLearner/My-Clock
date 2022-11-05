totalSecondsToHours = function (sec) {
    const res = ~~(sec / 60 / 60);
    return res;
};

totalSecondsToMinutes = function (sec) {
    return ~~((sec / 60) % 60);
};

totalSecondsToSeconds = function (sec) {
    return ~~((sec % 60) % 60);
};

timeParamsToTotalSeconds = function (seconds, minutes, hours) {
    seconds = seconds ?? 0;
    minutes = minutes ?? 0;
    hours = hours ?? 0;
    const result = seconds + minutes * 60 + hours * 3600;

    return result < 0 ? result % -360000 : result % 360000;
};

currentTimeToTotalSeconds = function () {
    const now = new Date();

    return timeParamsToTotalSeconds(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    );
};

setHours = function (seconds, setHours) {
    return setHours < 0
        ? seconds + setHours * 3600 + totalSecondsToHours(seconds) * 3600
        : seconds + setHours * 3600 - totalSecondsToHours(seconds) * 3600;
};

setMinutes = function (seconds, setMinutes) {
    return setMinutes < 0
        ? seconds + setMinutes * 60 + totalSecondsToMinutes(seconds) * 60
        : seconds + setMinutes * 60 - totalSecondsToMinutes(seconds) * 60;
};

setSeconds = function (seconds, setSeconds) {
    return setSeconds < 0
        ? seconds + setSeconds + totalSecondsToSeconds(seconds)
        : seconds + setSeconds - totalSecondsToSeconds(seconds);
};

addHoursToTotalSeconds = function (seconds, num) {
    return seconds + (num % 100) * 3600;
};

addMinutesToTotalSeconds = function (seconds, num) {
    return seconds + num * 60;
};

addSecondsToTotalSeconds = function (seconds, num) {
    return seconds + num;
};

timeLimitCheck = function (seconds) {
    return seconds > 0 ? seconds % 360000 : seconds % -360000;
};

countDown = function (start, total) {
    const intervalID = setInterval(() => {
        if (start === false || total === 0) {
            clearInterval(intervalID);
            return total;
        } else total--;
    }, 1000);
};

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
