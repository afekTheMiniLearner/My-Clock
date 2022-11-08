const {
    convertSecondsToHoursUnit,
    convertSecondsToMinutesUnit,
    convertSecondsToSecondsUnit,
    timeParamsToTotalSeconds,
    currentTimeToTotalSeconds,
    addHoursToTotalSeconds,
    addMinutesToTotalSeconds,
    addSecondsToTotalSeconds,
    timeLimitCheck,
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
                : timeParamsToTotalSeconds({ seconds, minutes, hours });
    }

    get hours() {
        return convertSecondsToHoursUnit(this.#seconds);
    }

    get minutes() {
        return convertSecondsToMinutesUnit(this.#seconds);
    }

    get seconds() {
        return convertSecondsToSecondsUnit(this.#seconds);
    }

    get totalSeconds() {
        return this.#seconds;
    }

    set hours(hours) {
        validateParam(hours, false);

        sign = hours < 0 ? -1 : 1;

        const temp = new Time({
            hours: hours,
            minutes: this.minutes,
            secnods: this.secnods,
        });

        this.#seconds += temp.totalSeconds * sign;
    }

    set minutes(minutes) {
        validateParam(minutes, false);

        sign = minutes < 0 ? -1 : 1;

        const temp = new Time({
            hours: this.hours,
            minutes: minutes,
            secnods: this.secnods,
        });

        this.#seconds += temp.totalSeconds * sign;
    }

    set seconds(seconds) {
        validateParam(seconds, false);

        sign = seconds < 0 ? -1 : 1;

        const temp = new Time({
            hours: this.hours,
            minutes: this.minutes,
            secnods: seconds,
        });

        this.#seconds += temp.totalSeconds * sign;
    }

    addHours(num) {
        validateParam(num, false);

        this.#seconds = addHoursToTotalSeconds(this.#seconds, num);
    }

    addMinutes(num) {
        validateParam(num, false);

        this.#seconds = addMinutesToTotalSeconds(this.#seconds, num);
    }

    addSeconds(num) {
        validateParam(num, false);

        this.#seconds = addSecondsToTotalSeconds(this.#seconds, num);
    }

    subHours(num) {
        validateParam(num, false);

        this.#seconds -= (num % 100) * 3600;
    }

    subMinutes(num) {
        validateParam(num, false);

        this.#seconds -= num * 60;
    }

    subSeconds(num) {
        validateParam(num, false);

        this.#seconds -= num;
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

    setTotalSeconds(num) {
        this.#seconds = num;
    }

    toString(format = 'HH:MM:SS') {
        if (typeof format !== 'string') {
            throw Error(
                'Format options must contain one of the following: HH/MM/SS'
            );
        }

        this.#seconds = timeLimitCheck(this.#seconds);

        const replaceHours =
            this.#seconds < 0
                ? `${Math.abs(this.hours)}`.padStart(3, '-0')
                : `${this.hours}`.padStart(2, '0');

        return format
            .replace('MM', `${Math.abs(this.minutes)}`.padStart(2, '0'))
            .replace('SS', `${Math.abs(this.seconds)}`.padStart(2, '0'))
            .replace('HH', replaceHours);
    }
}

module.exports = Time;
