const {
    convertSecondsToHoursUnit,
    convertSecondsToMinutesUnit,
    convertSecondsToSecondsUnit,
    timeUnitsToTotalSeconds,
    currentTimeToTotalSeconds,
    hoursToTotalSeconds,
    minutesToTotalSeconds,
} = require('./utils/calculators');
const { validateParam } = require('./utils/validators');
const { maxSeconds, minSeconds } = require('./utils/consts');

class Time {
    #seconds;

    constructor({ seconds = null, minutes = null, hours = null } = {}) {
        validateParam(seconds);
        validateParam(minutes);
        validateParam(hours);

        const shouldSetToCurrentTime =
            seconds === null && minutes === null && hours === null;

        this.#seconds = shouldSetToCurrentTime
            ? currentTimeToTotalSeconds()
            : timeUnitsToTotalSeconds({ seconds, minutes, hours });

        this.validateLimiter();
    }

    validateLimiter() {
        if (this.#seconds > maxSeconds) {
            this.#seconds = maxSeconds;
        } else if (this.#seconds < minSeconds) {
            this.#seconds = minSeconds;
        }
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

        const temp = new Time({
            hours: hours,
            minutes: this.minutes,
            seconds: this.seconds,
        });

        this.#seconds = temp.totalSeconds;
        this.validateLimiter();
    }

    set minutes(minutes) {
        validateParam(minutes, false);

        const temp = new Time({
            hours: this.hours,
            minutes: minutes,
            seconds: this.seconds,
        });

        this.#seconds = temp.totalSeconds;
        this.validateLimiter();
    }

    set seconds(seconds) {
        validateParam(seconds, false);

        const temp = new Time({
            hours: this.hours,
            minutes: this.minutes,
            seconds: seconds,
        });

        this.#seconds = temp.totalSeconds;
        this.validateLimiter();
    }

    addHours(hours) {
        validateParam(hours, false);
        this.#seconds += hoursToTotalSeconds(hours);
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
        const temp = new Time({
            hours: 0,
            minutes: this.minutes,
            seconds: this.seconds,
        });

        this.#seconds = temp.totalSeconds;
    }

    resetMinutes() {
        const temp = new Time({
            hours: this.hours,
            minutes: 0,
            seconds: this.seconds,
        });

        this.#seconds = temp.totalSeconds;
    }

    resetSeconds() {
        const temp = new Time({
            hours: this.hours,
            minutes: this.minutes,
            seconds: 0,
        });

        this.#seconds = temp.totalSeconds;
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

    toString(format = 'HH:MM:SS') {
        if (typeof format !== 'string') {
            throw Error(
                'Format options must contain one of the following: HH/MM/SS'
            );
        }
        const sign = this.#seconds >= 0;

        return (
            (sign ? '' : '-') +
            format
                .replace('MM', `${Math.abs(this.minutes)}`.padStart(2, '0'))
                .replace('SS', `${Math.abs(this.seconds)}`.padStart(2, '0'))
                .replace('HH', `${Math.abs(this.hours)}`.padStart(2, '0'))
        );
    }
}

module.exports = Time;
