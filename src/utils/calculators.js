totalSecondsToHours = function (sec) {
    return ~~((sec / 60 / 60) % 100);
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

    return seconds + minutes * 60 + hours * 3600;
};

currentTimeToTotalSeconds = function () {
    const now = new Date();

    return timeParamsToTotalSeconds(
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    );
};

changeHours = function (seconds, setHours) {
    return setHours < 0
        ? seconds + setHours * 3600 + totalSecondsToHours(seconds) * 3600
        : seconds + setHours * 3600 - totalSecondsToHours(seconds) * 3600;
};

changeMinutes = function (seconds, setMinutes) {
    return setMinutes < 0
        ? seconds + setMinutes * 60 + totalSecondsToMinutes(seconds) * 60
        : seconds + setMinutes * 60 - totalSecondsToMinutes(seconds) * 60;
};

changeSeconds = function (seconds, setSeconds) {
    return setSeconds < 0
        ? seconds + setSeconds + totalSecondsToSeconds(seconds)
        : seconds + setSeconds - totalSecondsToSeconds(seconds);
};

module.exports = {
    totalSecondsToHours,
    totalSecondsToMinutes,
    totalSecondsToSeconds,
    timeParamsToTotalSeconds,
    currentTimeToTotalSeconds,
    changeHours,
    changeMinutes,
    changeSeconds,
};
