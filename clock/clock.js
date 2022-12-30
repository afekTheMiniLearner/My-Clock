const Time = require('../time/time');
const { MAX_CLOCK_SECONDS, MIN_CLOCK_SECONDS } = require('./utils/consts');

// ask if i should allow negative time here?

class Clock extends Time {
    constructor(
        { seconds = null, minutes = null, hours = null } = {},
        autoStart = true
    ) {
        super({ seconds, minutes, hours });

        this.interval = null;

        if (autoStart) this.start();
    }

    validateLimiter() {
        if (this.tSeconds > MAX_CLOCK_SECONDS) {
            this.tSeconds = MAX_CLOCK_SECONDS;
        } else if (this.tSeconds < MIN_CLOCK_SECONDS) {
            this.tSeconds = MIN_CLOCK_SECONDS;
        }
    }

    start() {
        if (this.interval) return;

        this.interval = setInterval(() => {
            if (this.totalSeconds === MAX_CLOCK_SECONDS) this.pause();
            else this.addSeconds(1);
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
    }
}

module.exports = Clock;
