const { Time } = require('../time');

describe('Time class tests', () => {
    describe('valid cases', () => {
        test.each([
            [23, ['23', '00', '00']],
            [24, ['00', '00', '00']],
            [20, ['20', '00', '00']],
            [10, ['10', '00', '00']],
            [5, ['05', '00', '00']],
            [1, ['01', '00', '00']],
        ])(
            'set hours method accepts number:%s and returns time: %s',
            (num, res) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });
                time1.hours = num;

                const arr = time1.toString().split(':');
                expect(arr).toEqual(res);
            }
        );

        test.each([
            [60, ['00', '60', '00']],
            [30, ['00', '30', '00']],
            [20, ['00', '20', '00']],
            [10, ['00', '10', '00']],
            [5, ['00', '05', '00']],
            [1, ['00', '01', '00']],
        ])(
            'set minutes method accepts number:%s and returns time: %s',
            (num, res) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });
                time1.minutes = num;

                const arr = time1.toString().split(':');
                expect(arr).toEqual(res);
            }
        );

        test.each([
            [60, ['00', '00', '60']],
            [30, ['00', '00', '30']],
            [20, ['00', '00', '20']],
            [10, ['00', '00', '10']],
            [5, ['00', '00', '05']],
            [1, ['00', '00', '01']],
        ])(
            'set seconds method accepts number:%s and returns time: %s',
            (num, res) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });
                time1.seconds = num;

                const arr = time1.toString().split(':');
                expect(arr).toEqual(res);
            }
        );

        test.each([
            [23, 23],
            [0, 0],
            [20, 20],
            [10, 10],
            [5, 5],
            [1, 1],
        ])(
            'get hours method for the time created with: %s hours, returns number: %s',
            (num, res) => {
                const time1 = new Time({
                    seconds: 0,
                    minutes: 0,
                    hours: num,
                });

                expect(time1.getHrs).toBe(res);
            }
        );

        test.each([
            [60, 60],
            [30, 30],
            [20, 20],
            [10, 10],
            [5, 5],
            [1, 1],
        ])(
            'get minutes method for the time created with: %s minutes, returns number: %s',
            (num, res) => {
                const time1 = new Time({
                    seconds: 0,
                    minutes: num,
                    hours: 0,
                });

                expect(+time1.getMin).toBe(res);
            }
        );

        test.each([
            [60, 60],
            [30, 30],
            [20, 20],
            [10, 10],
            [5, 5],
            [1, 1],
        ])(
            'get seconds method for the time created with: %s seconds, returns number: %s',
            (num, res) => {
                const time1 = new Time({
                    seconds: num,
                    minutes: 0,
                    hours: 0,
                });

                expect(+time1.getSec).toBe(res);
            }
        );

        test.each([
            [2, 60, 10800],
            [3, 30, 12600],
            [0, 30, 1800],
            [0, 15, 900],
            [10, 0, 36000],
            [0, 1, 60],
        ])(
            'get method totalSeconds  for time created with: %s hours and %s minutes, returns: %s',
            (hrs, min, res) => {
                const time1 = new Time({
                    seconds: 0,
                    minutes: min,
                    hours: hrs,
                });

                expect(time1.totalSeconds).toBe(res);
            }
        );
    });

    describe('invalid cases', () => {
        test.each([
            [-9],
            [-5],
            [-300],
            [200],
            [29],
            [61],
            [105],
            [125],
            [9999],
            [159],
            [7656],
        ])('creation of time with invalid number of hours', (num) => {
            expect(() => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: num });
            }).toThrow(Error('Time element out of range'));
        });

        test.each([
            [-9],
            [-5],
            [-300],
            [200],
            [79],
            [61],
            [105],
            [125],
            [9999],
            [159],
            [7656],
        ])('creation of time with invalid number of minutes', (num) => {
            expect(() => {
                const time1 = new Time({ seconds: 0, minutes: num, hours: 0 });
            }).toThrow(Error('Time element out of range'));
        });

        test.each([
            [-9],
            [-5],
            [-300],
            [200],
            [79],
            [61],
            [105],
            [125],
            [9999],
            [159],
            [7656],
        ])('creation of time with invalid number of seconds', (num) => {
            expect(() => {
                const time1 = new Time({ seconds: num, minutes: 0, hours: 0 });
            }).toThrow(Error('Time element out of range'));
        });

        test.each([
            [69],
            [25],
            [300],
            [200],
            [29],
            [61],
            [105],
            [125],
            [9999],
            [159],
            [7656],
        ])(
            'set hours method accepts invalid number: %s and returns error',
            (num) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });

                expect(() => {
                    time1.hours = num;
                }).toThrow(Error("hours can't set to more than 24"));
            }
        );

        test.each([
            [69],
            [300],
            [200],
            [61],
            [9999],
            [105],
            [1025],
            [125],
            [159],
            [7656],
        ])(
            'set minutes method accepts invalid number: %s and returns error',
            (num) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });

                expect(() => {
                    time1.minutes = num;
                }).toThrow(Error("minutes can't set to more than 60"));
            }
        );

        test.each([
            [69],
            [300],
            [200],
            [61],
            [9999],
            [105],
            [1025],
            [125],
            [159],
            [7656],
        ])(
            'set seconds method accepts invalid number: %s and returns error',
            (num) => {
                const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });

                expect(() => {
                    time1.seconds = num;
                }).toThrow(Error("seconds can't set to more than 60"));
            }
        );
    });
});
