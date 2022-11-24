const {
    convertSecondsToHoursUnit,
    convertSecondsToMinutesUnit,
    convertSecondsToSecondsUnit,
    timeParamsToTotalSeconds,
    currentTimeToTotalSeconds,
    hoursToTotalSeconds,
    minutesToTotalSeconds,
} = require('./utils/calculators');
const { validateParam } = require('./utils/validators');

class Time {
    #seconds;

    static maxSeconds = 359999;
    static minSeconds = 359999;

    constructor({ seconds = null, minutes = null, hours = null } = {}) {
        validateParam(seconds);
        validateParam(minutes);
        validateParam(hours);

        this.#seconds =
            seconds === null && minutes === null && hours === null
                ? currentTimeToTotalSeconds()
                : timeParamsToTotalSeconds({ seconds, minutes, hours });
        this.validateLimiter();
    }

    validateLimiter() {
        if (this.#seconds > Time.maxSeconds) this.#seconds = 359999;
        else if (this.#seconds < Time.minSeconds) this.#seconds = -359999;
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
        this.validateLimiter();
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
        this.validateLimiter();
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
        this.validateLimiter();
    }

    addHours(hours) {
        validateParam(hours, false);

        this.#seconds = hoursToTotalSeconds(hours);
        this.validateLimiter();
    }

    addMinutes(minutes) {
        validateParam(minutes, false);

        this.#seconds += minutesToTotalSeconds(minutes);
        this.validateLimiter();
    }

    addSeconds(seconds) {
        validateParam(seconds, false);

        this.#seconds += seconds;
        this.validateLimiter();
    }

    subHours(hours) {
        validateParam(hours, false);

        this.#seconds -= hoursToTotalSeconds(hours);
        this.validateLimiter();
    }

    subMinutes(minutes) {
        validateParam(minutes, false);

        this.#seconds -= minutesToTotalSeconds(minutes);
        this.validateLimiter();
    }

    subSeconds(seconds) {
        validateParam(seconds, false);

        this.#seconds -= seconds;
        this.validateLimiter();
    }

    resetHours() {
        this.#seconds -= this.hours * 3600;
    }

    resetMinutes() {
        this.#seconds -= this.minutes * 60;
    }

    resetSeconds() {
        this.#seconds -= this.seconds;
    }

    reset() {
        this.#seconds = 0;
    }

    addTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        this.#seconds += time2.totalSeconds;
        this.validateLimiter();
    }

    subTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        this.#seconds -= time2.totalSeconds;
        this.validateLimiter();
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

        this.validateLimiter();

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
