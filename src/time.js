class Time {
    #totalSec;

    static #validateParam(param) {
        if (param === null) return;

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
        Time.#validateParam(num);

        const hrs = this.getHours;
        num %= 100;

        this.#totalSec += num * 3600 - hrs * 3600;
    }

    set minutes(num) {
        Time.#validateParam(num);

        const min = this.getMinutes;

        this.#totalSec += num * 60 - min * 60;
    }

    set seconds(num) {
        Time.#validateParam(num);

        const sec = this.getSeconds;

        this.#totalSec += num - sec;
    }

    addHours(num) {
        Time.#validateParam(num);

        this.#totalSec += (num % 100) * 3600;
    }

    addMinutes(num) {
        Time.#validateParam(num);

        this.#totalSec += num * 60;
    }

    addSeconds(num) {
        Time.#validateParam(num);

        this.#totalSec += num;
    }

    subHours(num) {
        Time.#validateParam(num);

        if (this.#totalSec - (num % 100) * 3600 < 0) this.#totalSec = 0;
        else this.#totalSec -= (num % 100) * 3600;
    }

    subMinutes(num) {
        Time.#validateParam(num);

        if (this.#totalSec - num * 60 < 0) this.#totalSec = 0;
        else this.#totalSec -= num * 60;
    }

    subSeconds(num) {
        Time.#validateParam(num);

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

        const [hours, minutes, seconds] = [
            `${this.getHours}`.padStart(2, '0'),
            `${this.getMinutes}`.padStart(2, '0'),
            `${this.getSeconds}`.padStart(2, '0'),
        ];

        format = format
            .replace('HH', hours)
            .replace('MM', minutes)
            .replace('SS', seconds);

        return format;
    }
}

module.exports = Time;
