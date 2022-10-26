class Clock {
    #sec;
    #min;
    #hrs;
    #creation;
    #absoluteTime;
    #calculateClock;
    constructor(sec, min, hrs) {
        this.#sec = sec ?? null;
        this.#min = min ?? null;
        this.#hrs = hrs ?? null;
        this.#creation = new Date();
        this.#absoluteTime = { hours: null, minutes: null, seconds: null };
        this.#calculateClock = function () {
            const now = new Date();
            const clockTime = [];

            if (this.#sec === null) {
                clockTime.push(
                    now.getHours(),
                    now.getMinutes(),
                    now.getSeconds()
                );
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

                clockTime.push(totalHours, totalMinutes, totalSeconds);

                while (true) {
                    if (clockTime[2] > 60) {
                        clockTime[1] += Math.floor(clockTime[0] / 60);
                        clockTime[2] = clockTime[0] % 60;
                    }

                    if (clockTime[1] > 60) {
                        clockTime[0] += Math.floor(clockTime[1] / 60);
                        clockTime[1] = clockTime[1] % 60;
                    }

                    if (clockTime[0] > 23) {
                        clockTime[0] -= 24;
                    }

                    break;
                }
            }

            for (let i = clockTime.length - 1; i >= 0; i--) {
                const absolute = Object.values(this.#absoluteTime);

                if (absolute[i] !== null) clockTime[i] = absolute[i];

                clockTime[i] = JSON.stringify(clockTime[i]);

                if (clockTime[i].length === 1) {
                    clockTime[i] = '0' + clockTime[i];
                }
            }

            return clockTime;
        };
    }

    get seconds() {
        return JSON.stringify(this.#calculateClock()[2]);
    }

    get minutes() {
        return JSON.stringify(this.#calculateClock()[1]);
    }

    get hours() {
        return JSON.stringify(this.#calculateClock()[0]);
    }

    setSeconds(num) {
        this.#absoluteTime.seconds = num;
    }

    setMinutes(num) {
        this.#absoluteTime.minutes = num;
    }

    setHours(num) {
        this.#absoluteTime.hours = num;
    }

    toString() {
        return this.#calculateClock().join(':');
    }
}

const clocky = new Clock(30, 5, 1);

console.log(clocky.toString());

clocky.setHours(8);

console.log(clocky.toString());
