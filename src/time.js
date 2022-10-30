class Time {
    #totalSec;

    constructor({ seconds = null, minutes = null, hours = null } = {}) {
        const noParams = seconds === null && minutes === null && hours === null;
        const negativeParams = seconds < 0 || minutes < 0 || hours < 0;

        if (negativeParams) throw Error("Time element can't be negative");

        if (noParams) {
            const now = new Date();
            this.#totalSec =
                now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds();
        } else {
            seconds = seconds ?? 0;
            minutes = minutes ?? 0;
            hours = hours ?? 0;

            this.#totalSec = seconds + minutes * 60 + hours * 60 * 60;
        }
    }

    get getHrs() {
        const res = ~~((this.#totalSec / 60 / 60) % 100);
        return res;
    }

    get getMin() {
        return ~~((this.#totalSec / 60) % 60);
    }

    get getSec() {
        return ~~((this.#totalSec % 60) % 60);
    }

    get totalSeconds() {
        return this.#totalSec;
    }

    set hours(num) {
        if (num < 0) throw Error("Time element can't be negative");

        const hrs = this.getHrs;
        num %= 100;

        this.#totalSec += num * 3600 - hrs * 3600;
    }

    set minutes(num) {
        if (num < 0) throw Error("Time element can't be negative");

        const min = this.getMin;

        this.#totalSec += num * 60 - min * 60;
    }

    set seconds(num) {
        if (num < 0) throw Error("Time element can't be negative");
        const sec = this.getSec;

        this.#totalSec += num - sec;
    }

    addHours(num) {
        this.#totalSec += (num % 100) * 3600;
    }

    addMinutes(num) {
        this.#totalSec += num * 60;
    }

    addSeconds(num) {
        this.#totalSec += num;
    }

    subHours(num) {
        if (this.#totalSec - (num % 100) * 3600 < 0) this.#totalSec = 0;
        else this.#totalSec -= (num % 100) * 3600;
    }

    subMinutes(num) {
        if (this.#totalSec - num * 60 < 0) this.#totalSec = 0;
        else this.#totalSec -= num * 60;
    }

    subSeconds(num) {
        if (this.#totalSec - num < 0) this.#totalSec = 0;
        else this.#totalSec -= num;
    }

    resetSeconds() {
        this.#totalSec -= this.getSec;
    }

    resetMinutes() {
        this.#totalSec -= this.getMin * 60;
    }

    resetHours() {
        this.#totalSec -= this.getHrs * 3600;
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

    toString(format = 'default') {
        const result = [
            `${this.getHrs}`.padStart(2, '0'),
            `${this.getMin}`.padStart(2, '0'),
            `${this.getSec}`.padStart(2, '0'),
        ];

        if (typeof format !== 'string') {
            throw Error(
                'Format options must contain one of the following: HH/MM/SS'
            );
        }

        if (format === 'default') return result.join(':');
        else {
            let isValid = false;
            let formattedResult = '';

            for (let i = 0; i < format.length; i++) {
                switch (true) {
                    case format.charAt(i) + format.charAt(i + 1) === 'HH':
                        formattedResult += result[0];
                        isValid = true;
                        i++;
                        break;
                    case format.charAt(i) + format.charAt(i + 1) === 'MM':
                        formattedResult += result[1];
                        isValid = true;
                        i++;
                        break;
                    case format.charAt(i) + format.charAt(i + 1) === 'SS':
                        formattedResult += result[2];
                        isValid = true;
                        i++;
                        break;
                    default:
                        formattedResult += format.charAt(i);
                }
            }

            if (isValid === false) {
                throw Error(
                    'Format options must contain one of the following: HH/MM/SS'
                );
            }

            return formattedResult;
        }
    }
}
module.exports = Time;
