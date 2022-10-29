module.exports.Time = class {
    #sec;
    #min;
    #hrs;
    #creation;
    #absoluteTime;
    #calculateTime;

    constructor(timeObject = { seconds: null, minutes: null, hours: null }) {
        const tooLow =
            timeObject.seconds < 0 ||
            timeObject.minutes < 0 ||
            timeObject.hours < 0;

        if (tooLow) throw Error("Time element can't be negative");

        this.#sec = timeObject.seconds ?? null;
        this.#min = timeObject.minutes ?? null;
        this.#hrs = timeObject.hours ?? null;
        this.#creation = new Date();
        this.#absoluteTime = {
            hours: {
                set: { bool: false, num: 0 },
                add: { bool: false, num: 0 },
                sub: { bool: false, num: 0 },
            },
            minutes: {
                set: { bool: false, num: 0 },
                add: { bool: false, num: 0 },
                sub: { bool: false, num: 0 },
            },
            seconds: {
                set: { bool: false, num: 0 },
                add: { bool: false, num: 0 },
                sub: { bool: false, num: 0 },
            },
        };

        this.#calculateTime = function () {
            const abs = Object.values(this.#absoluteTime);
            const now = new Date();
            let time = [];

            if (
                this.#sec === null &&
                this.#min === null &&
                this.#hrs === null
            ) {
                time.push(now.getHours(), now.getMinutes(), now.getSeconds());
            } else {
                const totalSeconds =
                    this.#sec + now.getSeconds() - this.#creation.getSeconds();
                const totalMinutes =
                    (this.#min ?? 0) +
                    now.getMinutes() -
                    this.#creation.getMinutes();
                const totalHours =
                    ((this.#hrs ?? 0) +
                        now.getHours() -
                        this.#creation.getHours()) %
                    24;

                time.push(totalHours, totalMinutes, totalSeconds);

                for (let i = time.length - 1; i >= 0; i--) {
                    const obj = abs[i];

                    if (obj.add.bool === true) {
                        time[i] += obj.add.num;
                    }
                    if (obj.sub.bool === true) {
                        time[i] -= obj.sub.num;
                    }
                }

                if (time[2] < 0 || time[1] < 0 || time[0] < 0) {
                    let secondsSum = (time[0] * 60 + time[1]) * 60 + time[2];
                    time = secondsSum > 0 ? [0, 0, secondsSum] : [0, 0, 0];
                }

                const tooHigh = time[2] > 60 || time[1] > 60 || time[0] > 24;
                while (tooHigh) {
                    if (time[2] > 60) {
                        time[1] += Math.floor(time[2] / 60);
                        time[2] = time[2] % 60;
                    }

                    if (time[1] > 60) {
                        time[0] += Math.floor(time[1] / 60);
                        time[1] = time[1] % 60;
                    }

                    if (time[0] > 23) {
                        time[0] %= 24;
                    }

                    break;
                }
            }

            for (let i = time.length - 1; i >= 0; i--) {
                const obj = abs[i];

                if (obj.set.bool === true) time[i] = obj.set.num;

                time[i] = JSON.stringify(time[i]);
                if (time[i].length === 1) time[i] = '0' + time[i];
            }

            return time;
        };
    }

    get getHrs() {
        return +this.#calculateTime()[0];
    }

    get getMin() {
        return +this.#calculateTime()[1];
    }

    get getSec() {
        return +this.#calculateTime()[2];
    }

    get totalSeconds() {
        const res = this.#calculateTime();
        let sum = (+res[0] * 60 + +res[1]) * 60 + +res[2];
        return sum;
    }

    set hours(num) {
        if (num < 0) throw Error("Time element can't be negative");
        num %= 24;
        this.#absoluteTime.hours.add.bool = false;
        this.#absoluteTime.hours.sub.bool = false;
        this.#absoluteTime.hours.set.bool = true;
        this.#absoluteTime.hours.set.num = num;
    }

    set minutes(num) {
        if (num < 0) throw Error("Time element can't be negative");
        this.#absoluteTime.minutes.add.bool = false;
        this.#absoluteTime.minutes.sub.bool = false;
        this.#absoluteTime.minutes.set.bool = true;
        this.#absoluteTime.minutes.set.num = num;
    }

    set seconds(num) {
        if (num < 0) throw Error("Time element can't be negative");
        this.#absoluteTime.seconds.add.bool = false;
        this.#absoluteTime.seconds.sub.bool = false;
        this.#absoluteTime.seconds.set.bool = true;
        this.#absoluteTime.seconds.set.num = num;
    }

    addHours(num) {
        this.#absoluteTime.hours.add.bool = true;
        this.#absoluteTime.hours.add.num += num;
    }

    addMinutes(num) {
        this.#absoluteTime.minutes.add.bool = true;
        this.#absoluteTime.minutes.add.num += num;
    }

    addSeconds(num) {
        this.#absoluteTime.seconds.add.bool = true;
        this.#absoluteTime.seconds.add.num += num;
    }

    subHours(num) {
        this.#absoluteTime.hours.sub.bool = true;
        this.#absoluteTime.hours.sub.num = num;
    }

    subMinutes(num) {
        this.#absoluteTime.minutes.sub.bool = true;
        this.#absoluteTime.minutes.sub.num = num;
    }

    subSeconds(num) {
        this.#absoluteTime.seconds.sub.bool = true;
        this.#absoluteTime.seconds.sub.num = num;
    }

    resetSeconds() {
        this.seconds = 0;
    }

    resetMinutes() {
        this.minutes = 0;
    }

    resetHours() {
        this.hours = 0;
    }

    reset() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
    }

    addTime(time2) {
        if (!(time2 instanceof module.exports.Time)) {
            throw Error('Invalid time input');
        }

        const result = time2.toString().split(':');

        this.#absoluteTime.hours.add.bool = true;
        this.#absoluteTime.hours.add.num += +result[0];
        this.#absoluteTime.minutes.add.bool = true;
        this.#absoluteTime.minutes.add.num += +result[1];
        this.#absoluteTime.seconds.add.bool = true;
        this.#absoluteTime.seconds.add.num += +result[2];
    }

    subTime(time2) {
        if (!(time2 instanceof module.exports.Time)) {
            throw Error('Invalid time input');
        }

        const result = time2.toString().split(':');

        this.#absoluteTime.hours.sub.bool = true;
        this.#absoluteTime.hours.sub.num += +result[0];
        this.#absoluteTime.minutes.sub.bool = true;
        this.#absoluteTime.minutes.sub.num += +result[1];
        this.#absoluteTime.seconds.sub.bool = true;
        this.#absoluteTime.seconds.sub.num += +result[2];
    }

    toString() {
        // last task is to implement optionsFormat
        return this.#calculateTime().join(':');
    }
};
