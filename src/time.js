module.exports.Time = class {
    #sec;
    #min;
    #hrs;
    #creation;
    #absoluteTime;
    #calculateTime;

    constructor(timeObject) {
        this.#sec = timeObject.seconds ?? null;
        this.#min = timeObject.minutes ?? null;
        this.#hrs = timeObject.hours ?? null;
        this.#creation = new Date();
        this.#absoluteTime = {
            hours: {
                set: { bool: false, num: null },
                add: { bool: false, num: null },
                sub: { bool: false, num: null },
            },
            minutes: {
                set: { bool: false, num: null },
                add: { bool: false, num: null },
                sub: { bool: false, num: null },
            },
            seconds: {
                set: { bool: false, num: null },
                add: { bool: false, num: null },
                sub: { bool: false, num: null },
            },
        };

        this.#calculateTime = function () {
            const now = new Date();
            const time = [];

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
                    (this.#hrs ?? 0) +
                    now.getHours() -
                    this.#creation.getHours();

                time.push(totalHours, totalMinutes, totalSeconds);

                while (true) {
                    if (time[2] > 60) {
                        time[1] += Math.floor(time[0] / 60);
                        time[2] = time[0] % 60;
                    }

                    if (time[1] > 60) {
                        time[0] += Math.floor(time[1] / 60);
                        time[1] = time[1] % 60;
                    }

                    if (time[0] > 23) {
                        time[0] -= 24;
                    }

                    break;
                }
            }

            const absolute = Object.values(this.#absoluteTime);
            for (let i = time.length - 1; i >= 0; i--) {
                const obj = absolute[i];

                if (obj.set.bool === true) time[i] = obj.set.num;
                if (obj.add.bool === true) time[i] += obj.add.num;
                if (obj.sub.bool === true) time[i] -= obj.sub.num;

                time[i] = JSON.stringify(time[i]);

                if (time[i].length === 1) {
                    time[i] = '0' + time[i];
                }
            }

            return time;
        };
    }

    get s() {
        return JSON.stringify(this.#calculateTime()[2]);
    }

    get m() {
        return JSON.stringify(this.#calculateTime()[1]);
    }

    get h() {
        return JSON.stringify(this.#calculateTime()[0]);
    }

    get totalSeconds() {
        const res = JSON.stringify(this.#calculateTime()[0]);
        let sum = (res[0] * 60 + res[1]) * 60 + res[2];
        return sum;
    }

    set seconds(num) {
        this.#absoluteTime.seconds.add.bool = false;
        this.#absoluteTime.seconds.sub.bool = false;
        this.#absoluteTime.seconds.set.bool = true;
        this.#absoluteTime.seconds.set.num = num;
    }

    set minutes(num) {
        this.#absoluteTime.minutes.add.bool = false;
        this.#absoluteTime.minutes.sub.bool = false;
        this.#absoluteTime.minutes.set.bool = true;
        this.#absoluteTime.minutes.set.num = num;
    }

    set hours(num) {
        this.#absoluteTime.hours.add.bool = false;
        this.#absoluteTime.hours.sub.bool = false;
        this.#absoluteTime.hours.set.bool = true;
        this.#absoluteTime.hours.set.num = num;
    }

    addSeconds(num) {
        this.#absoluteTime.seconds.add.bool = true;
        this.#absoluteTime.seconds.add.num = num;
    }

    addMinutes(num) {
        this.#absoluteTime.minutes.add.bool = true;
        this.#absoluteTime.minutes.add.num = num;
    }

    addHours(num) {
        this.#absoluteTime.hours.add.bool = true;
        this.#absoluteTime.hours.add.num = num;
    }

    subSeconds(num) {
        this.#absoluteTime.seconds.sub.bool = true;
        this.#absoluteTime.seconds.sub.num = num;
    }

    subMinutes(num) {
        this.#absoluteTime.minutes.sub.bool = true;
        this.#absoluteTime.minutes.sub.num = num;
    }

    subHours(num) {
        this.#absoluteTime.hours.sub.bool = true;
        this.#absoluteTime.hours.sub.num = num;
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

    toString() {
        return this.#calculateTime().join(':');
    }
};
