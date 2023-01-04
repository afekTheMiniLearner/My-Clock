const Time = require('../time/time');
const {
    MAX_STOPPER_SECONDS,
    MIN_STOPPER_SECONDS,
} = require('../stopper/utils/consts');

// check what's the time limits of stopper?

class Stopper extends Time {
    constructor(
        { seconds = null, minutes = null, hours = null } = {},
        autoStart = false
    ) {
        super({ seconds, minutes, hours });

        this.interval = null;

        if (autoStart) this.start();
    }

    validateLimiter() {
        if (this.tSeconds > MAX_STOPPER_SECONDS) {
            this.tSeconds = MAX_STOPPER_SECONDS;
        } else if (this.tSeconds < MIN_STOPPER_SECONDS) {
            this.tSeconds = MIN_STOPPER_SECONDS;
        }
    }

    start() {
        if (this.interval) return;

        this.interval = setInterval(() => {
            if (this.tSeconds === MIN_STOPPER_SECONDS) this.pause();
            else this.subSeconds(1);
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
    }

    say() {
        console.log(this.tSeconds);
        console.log(this.toString());
    }
}

module.exports = Stopper;
