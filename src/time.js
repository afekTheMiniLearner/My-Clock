//todo import from external file - utils
// time range -99:59:59 - +99:59:59

class Time {
    #totalSec;
    //change name

    static #validateParam(param, allowedNull = true) {
        if (param === null)
            if (allowedNull) return;
            else throw Error('Time element must be a valid positive number');

        const isNegative = param < 0;
        const isInvalid = typeof param !== 'number' && !Number.isNaN(seconds);

        if (isInvalid || isNegative) {
            throw Error('Time element must be a valid positive number');
        }
    }

    static #calculateParams({ seconds, minutes, hours } = {}) {
        let total;

        if (seconds === null && minutes === null && hours === null) {
            const now = new Date();

            total =
                now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds();
        } else {
            seconds = seconds ?? 0;
            minutes = minutes ?? 0;
            hours = hours ?? 0;

            total = seconds + minutes * 60 + hours * 60 * 60;
            //use converters
        }
        return total;
    }

    constructor({ seconds = null, minutes = null, hours = null } = {}) {
        Time.#validateParam(seconds);
        Time.#validateParam(minutes);
        Time.#validateParam(hours);

        this.#totalSec = Time.#calculateParams({
            seconds,
            minutes,
            hours,
        });
    }

    #calculateHours() {
        return ~~((this.#totalSec / 60 / 60) % 100);
    }

    #calculateMinutes() {
        return ~~((this.#totalSec / 60) % 60);
    }

    #calculateSeconds() {
        return ~~((this.#totalSec % 60) % 60);
    }

    // change to hours
    get getHours() {
        return this.#calculateHours();
    }

    get getMinutes() {
        return this.#calculateMinutes();
    }

    get getSeconds() {
        return this.#calculateSeconds();
    }

    get totalSeconds() {
        return this.#totalSec;
    }

    set hours(num) {
        Time.#validateParam(num, false);

        const hrs = this.getHours;
        num %= 100;

        this.#totalSec += num * 3600 - hrs * 3600;
    }

    set minutes(num) {
        Time.#validateParam(num, false);

        const min = this.getMinutes;

        this.#totalSec += num * 60 - min * 60;
    }

    set seconds(num) {
        Time.#validateParam(num, false);

        const sec = this.getSeconds;

        this.#totalSec += num - sec;
    }

    addHours(num) {
        Time.#validateParam(num, false);

        this.#totalSec += (num % 100) * 3600;
    }

    addMinutes(num) {
        Time.#validateParam(num, false);

        this.#totalSec += num * 60;
    }

    addSeconds(num) {
        Time.#validateParam(num, false);

        this.#totalSec += num;
    }

    subHours(num) {
        Time.#validateParam(num, false);

        if (this.#totalSec - (num % 100) * 3600 < 0) this.#totalSec = 0;
        else this.#totalSec -= (num % 100) * 3600;
    }

    subMinutes(num) {
        Time.#validateParam(num, false);

        if (this.#totalSec - num * 60 < 0) this.#totalSec = 0;
        else this.#totalSec -= num * 60;
    }

    subSeconds(num) {
        Time.#validateParam(num, false);

        if (this.#totalSec - num < 0) this.#totalSec = 0;
        else this.#totalSec -= num;
    }

    resetSeconds() {
        this.#totalSec -= this.getSeconds;
    }

    resetMinutes() {
        this.#totalSec -= this.getMinutes * 60;
    }

    resetHours() {
        this.#totalSec -= this.getHours * 3600;
    }

    reset() {
        this.#totalSec = 0;
    }

    addTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        this.#totalSec += time2.totalSeconds;
    }

    subTime(time2) {
        if (!(time2 instanceof Time)) {
            throw Error('Invalid time input');
        }

        if (this.#totalSec - time2.totalSeconds < 0) this.#totalSec = 0;
        else this.#totalSec -= time2.totalSeconds;
    }

    toString(format = 'HH:MM:SS') {
        if (typeof format !== 'string') {
            throw Error(
                'Format options must contain one of the following: HH/MM/SS'
            );
        }

        return format
            .replace('HH', `${this.getHours}`.padStart(2, '0'))
            .replace('MM', `${this.getMinutes}`.padStart(2, '0'))
            .replace('SS', `${this.getSeconds}`.padStart(2, '0'));
    }
}

module.exports = Time;
