const { countDown } = require('./utils/calculators');
const Time = require('./time');

class Clock extends Time {
    constructor(autoStart = true) {
        super();
        if (autoStart === true) start();
    }

    start() {
        this.setTotalSeconds(countDown(true, this.totalSeconds));
    }

    pause() {
        this.setTotalSeconds(countDown(false, this.totalSeconds));
    }
    
}

const clocy = new Clock({ seconds: 50, minutes: 6, hours: 4 });

console.log(clocy.toString());

const intervalID = setInterval(() => {
    console.log('done');
    clearInterval(intervalID);
    clocy.pause();
    console.log(clocy.toString());
}, 5000);
