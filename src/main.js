class Clock {
    constructor(sec, min, hrs) {
        this.sec = sec ?? null;
        this.min = min ?? null;
        this.hrs = hrs ?? null;
        this.creation = new Date();
    }

    showTime() {
        const clockTime = [];
        const now = new Date();

        if (this.sec === null) {
            clockTime.push(now.getHours());
            clockTime.push(now.getMinutes());
            clockTime.push(now.getSeconds());
        } else {
            const totalSeconds =
                this.sec + now.getSeconds() - this.creation.getSeconds();
            const totalMinutes =
                (this.min ?? 0) + now.getMinutes() - this.creation.getMinutes();
            const totalHours =
                (this.hrs ?? 0) + now.getHours() - this.creation.getHours();

            clockTime.push(totalSeconds, totalMinutes, totalHours);

            while (true) {
                if (clockTime[0] > 60) {
                    clockTime[1] += Math.floor(clockTime[0] / 60);
                    clockTime[0] = clockTime[0] % 60;
                }

                if (clockTime[1] > 60) {
                    clockTime[2] += Math.floor(clockTime[1] / 60);
                    clockTime[1] = clockTime[1] % 60;
                }

                if (clockTime[2] > 23) {
                    clockTime[2] -= 24;
                }

                break;
            }
        }

        for (let i = 0; i < clockTime.length; i++) {
            clockTime[i] = JSON.stringify(clockTime[i]);

            if (clockTime[i].length === 1) {
                clockTime[i] = '0' + clockTime[i];
            }
        }

        console.log(clockTime.reverse().join(':'));
    }
}

const clocky = new Clock(30, 5, 1);
setInterval(() => {
    clocky.showTime();
}, 5000);
console.log('im in');
