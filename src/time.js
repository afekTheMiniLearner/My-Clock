// time range -99:59:59 - +99:59:59
const {
    totalSecondsToHours,
    totalSecondsToMinutes,
    totalSecondsToSeconds,
    timeParamsToTotalSeconds,
    currentTimeToTotalSeconds,
    changeHours,
    changeMinutes,
    changeSeconds,
} = require('./utils/calculators');
const { validateParam } = require('./utils/validators');

class Time {
    #seconds;

    constructor({ seconds = null, minutes = null, hours = null } = {}) {
        validateParam(seconds);
        validateParam(minutes);
        validateParam(hours);

        this.#seconds =
            seconds === null && minutes === null && hours === null
                ? currentTimeToTotalSeconds()
                : timeParamsToTotalSeconds(seconds, minutes, hours);
    }

    get hours() {
        return totalSecondsToHours(this.#seconds);
    }

    get minutes() {
        return totalSecondsToMinutes(this.#seconds);
    }

    get seconds() {
        return totalSecondsToSeconds(this.#seconds);
    }

    get totalSeconds() {
        return this.#seconds;
    }

    set hours(num) {
        validateParam(num, false);

        this.#seconds = changeHours(this.#seconds, num);
    }

    set minutes(num) {
        validateParam(num, false);

        this.#seconds = changeMinutes(this.#seconds, num);
    }

    set seconds(num) {
        validateParam(num, false);

        this.#seconds = changeSeconds(this.#seconds, num);
    }

    addHours(num) {
        validateParam(num, false);

        this.#seconds += (num % 100) * 3600;
    }

    addMinutes(num) {
        validateParam(num, false);

        this.#seconds += num * 60;
    }

    addSeconds(num) {
        validateParam(num, false);

        this.#seconds += num;
    }

    subHours(num) {
        validateParam(num, false);

        if (this.#seconds - (num % 100) * 3600 < 0) this.#seconds = 0;
        else this.#seconds -= (num % 100) * 3600;
    }

    subMinutes(num) {
        validateParam(num, false);

        if (this.#seconds - num * 60 < 0) this.#seconds = 0;
        else this.#seconds -= num * 60;
    }

    subSeconds(num) {
        validateParam(num, false);

        if (this.#seconds - num < 0) this.#seconds = 0;
        else this.#seconds -= num;
    }

    resetSeconds() {
        this.#seconds -= this.seconds;
    }

    resetMinutes() {
        this.#seconds -= this.minutes * 60;
    }

    resetHours() {
        this.#seconds -= this.hours * 3600;
    }

    reset() {
        this.#seconds = 0;
    }

    addTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        this.#seconds += time2.totalSeconds;
    }

    subTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        if (this.#seconds - time2.totalSeconds < 0) this.#seconds = 0;
        else this.#seconds -= time2.totalSeconds;
    }

    toString(format = 'HH:MM:SS') {
        if (typeof format !== 'string') {
            throw Error(
                'Format options must contain one of the following: HH/MM/SS'
            );
        }

        return format
            .replace('HH', `${this.hours}`.padStart(2, '0'))
            .replace('MM', `${this.minutes}`.padStart(2, '0'))
            .replace('SS', `${this.seconds}`.padStart(2, '0'));
    }
}

module.exports = Time;
