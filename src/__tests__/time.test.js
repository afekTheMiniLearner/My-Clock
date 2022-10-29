const { Time } = require('../time');

describe('Time class tests', () => {
    describe('valid cases', () => {
        describe('creation tests', () => {
            test('creating time without params returns valid time', () => {
                const time1 = new Time();

                const response = time1.toString().split(':');
                expect(response.length).toBe(3);
                for (const element of response) {
                    expect(typeof element).toBe('string');
                    expect(typeof +element).toBe('number');
                }
            });

            test.each([
                [25, ['01', '00', '00']],
                [48, ['00', '00', '00']],
                [50, ['02', '00', '00']],
                [10, ['10', '00', '00']],
                [22, ['22', '00', '00']],
                [5, ['05', '00', '00']],
                [1, ['01', '00', '00']],
            ])(
                'creating time with %s hours should returns time: %s',
                (num, result) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: num,
                    });

                    const response = time1.toString().split(':');
                    expect(response).toEqual(result);
                }
            );

            test.each([
                [1001, ['16', '41', '00']],
                [100, ['01', '40', '00']],
                [67, ['01', '07', '00']],
                [53, ['00', '53', '00']],
                [10, ['00', '10', '00']],
                [22, ['00', '22', '00']],
                [5, ['00', '05', '00']],
                [1, ['00', '01', '00']],
            ])(
                'creating time with %s minutes should returns time: %s',
                (num, result) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: num,
                        hours: 0,
                    });

                    const response = time1.toString().split(':');
                    expect(response).toEqual(result);
                }
            );

            test.each([
                [96100, ['02', '41', '40']],
                [16000, ['04', '26', '40']],
                [5420, ['01', '30', '20']],
                [4010, ['01', '06', '50']],
                [305, ['00', '05', '05']],
                [68, ['00', '01', '08']],
                [40, ['00', '00', '40']],
                [6, ['00', '00', '06']],
            ])(
                'creating time with %s seconds should returns time: %s',
                (num, result) => {
                    const time1 = new Time({
                        seconds: num,
                        minutes: 0,
                        hours: 0,
                    });

                    const response = time1.toString().split(':');
                    expect(response).toEqual(result);
                }
            );
        });

        describe('get methods tests', () => {
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

        describe('set methods tests', () => {
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
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
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
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
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
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
                    time1.seconds = num;

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );
        });

        describe('add/sub methods tests', () => {
            test.each([
                [25, ['01', '00', '00']],
                [48, ['00', '00', '00']],
                [50, ['02', '00', '00']],
                [10, ['10', '00', '00']],
                [22, ['22', '00', '00']],
                [5, ['05', '00', '00']],
                [1, ['01', '00', '00']],
            ])(
                'addHours method accepts number:%s and returns time: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
                    time1.addHours(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [1001, ['16', '41', '00']],
                [100, ['01', '40', '00']],
                [67, ['01', '07', '00']],
                [53, ['00', '53', '00']],
                [10, ['00', '10', '00']],
                [22, ['00', '22', '00']],
                [5, ['00', '05', '00']],
                [1, ['00', '01', '00']],
            ])(
                'addMinutes method accepts number:%s and returns time: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
                    time1.addMinutes(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [96100, ['02', '41', '40']],
                [16000, ['04', '26', '40']],
                [5420, ['01', '30', '20']],
                [4010, ['01', '06', '50']],
                [305, ['00', '05', '05']],
                [68, ['00', '01', '08']],
                [40, ['00', '00', '40']],
                [6, ['00', '00', '06']],
            ])(
                'addSeconds method accepts number:%s and returns time: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: 0,
                    });
                    time1.addSeconds(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [
                    ['01', '30', '30'],
                    ['01', '20', '20'],
                    ['02', '50', '50'],
                ],
                [
                    ['02', '30', '30'],
                    ['19', '20', '31'],
                    ['21', '51', '01'],
                ],
                [
                    ['10', '01', '20'],
                    ['23', '23', '20'],
                    ['09', '24', '40'],
                ],
                [
                    ['00', '00', '00'],
                    ['00', '00', '00'],
                    ['00', '00', '00'],
                ],
                [
                    ['01', '30', '30'],
                    ['00', '00', '00'],
                    ['01', '30', '30'],
                ],
                [
                    ['00', '00', '00'],
                    ['21', '20', '20'],
                    ['21', '20', '20'],
                ],
                [
                    ['14', '05', '10'],
                    ['04', '60', '15'],
                    ['19', '05', '25'],
                ],
            ])(
                'addTime method accepts time: %s and add it to time: %s, result: %s',
                (arr1, arr2, res) => {
                    const time1 = new Time({
                        seconds: +arr1[2],
                        minutes: +arr1[1],
                        hours: +arr1[0],
                    });

                    const time2 = new Time({
                        seconds: +arr2[2],
                        minutes: +arr2[1],
                        hours: +arr2[0],
                    });

                    time1.addTime(time2);

                    const response = time1.toString().split(':');
                    expect(response).toEqual(res);
                }
            );

            test.each([
                [
                    ['02', '50', '50'],
                    ['01', '30', '30'],
                    ['01', '20', '20'],
                ],
                [
                    ['21', '51', '01'],
                    ['02', '30', '30'],
                    ['19', '20', '31'],
                ],
                [
                    ['09', '24', '40'],
                    ['10', '01', '20'],
                    ['00', '00', '00'],
                ],
                [
                    ['10', '10', '50'],
                    ['02', '50', '30'],
                    ['07', '20', '20'],
                ],
                [
                    ['02', '30', '30'],
                    ['01', '30', '30'],
                    ['01', '00', '00'],
                ],
                [
                    ['21', '20', '20'],
                    ['21', '20', '20'],
                    ['00', '00', '00'],
                ],
                [
                    ['19', '05', '25'],
                    ['14', '05', '10'],
                    ['05', '00', '15'],
                ],
            ])(
                'subTime method accepts time: %s and sub from it time: %s, result: %s',
                (arr1, arr2, res) => {
                    const time1 = new Time({
                        seconds: +arr1[2],
                        minutes: +arr1[1],
                        hours: +arr1[0],
                    });

                    const time2 = new Time({
                        seconds: +arr2[2],
                        minutes: +arr2[1],
                        hours: +arr2[0],
                    });

                    time1.subTime(time2);

                    const response = time1.toString().split(':');
                    expect(response).toEqual(res);
                }
            );

            test.each([
                [['27', '00', '00'], 2, ['01', '00', '00']],
                [['3', '30', '50'], 5, ['00', '00', '00']],
                [['50', '00', '00'], 0, ['02', '00', '00']],
                [['15', '00', '00'], 10, ['05', '00', '00']],
                [['13', '00', '00'], 6, ['07', '00', '00']],
                [['00', '30', '00'], 1, ['00', '00', '00']],
                [['22', '00', '00'], 12, ['10', '00', '00']],
            ])(
                'subHours method created with %s time, accepts number:%s and returns time: %s',
                (initial, num, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.subHours(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [['02', '00', '00'], 30, ['01', '30', '00']],
                [['03', '30', '50'], 30, ['03', '00', '50']],
                [['04', '00', '00'], 0, ['04', '00', '00']],
                [['15', '60', '00'], 70, ['14', '50', '00']],
                [['1', '30', '57'], 1000, ['00', '00', '00']],
                [['00', '05', '120'], 6, ['00', '00', '60']],
                [['00', '05', '100'], 6, ['00', '00', '40']],
            ])(
                'subMinutes method created with %s time, accepts number:%s and returns time: %s',
                (initial, num, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.subMinutes(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [['22', '43', '40'], 96500, ['00', '00', '00']],
                [['22', '43', '40'], 81000, ['00', '13', '40']],
                [['10', '26', '60'], 16000, ['06', '00', '20']],
                [['22', '00', '20'], 5420, ['20', '30', '00']],
                [['01', '60', '40'], 4010, ['00', '53', '50']],
                [['01', '30', '57'], 1000, ['01', '14', '17']],
                [['20', '05', '100'], 50, ['20', '05', '50']],
                [['00', '05', '100'], 10, ['00', '06', '30']],
            ])(
                'subSeconds method created with %s hours, accepts number:%s and returns time: %s',
                (initial, num, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.subSeconds(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [
                    ['23', '30', '00'],
                    ['00', '30', '00'],
                ],
                [
                    ['3', '30', '50'],
                    ['00', '30', '50'],
                ],
                [
                    ['50', '11', '43'],
                    ['00', '11', '43'],
                ],
                [
                    ['6', '00', '00'],
                    ['00', '00', '00'],
                ],
                [
                    ['13', '10', '00'],
                    ['00', '10', '00'],
                ],
                [
                    ['00', '30', '00'],
                    ['00', '30', '00'],
                ],
                [
                    ['01', '01', '01'],
                    ['00', '01', '01'],
                ],
            ])(
                'resetHours method created with %s time, returns time: %s',
                (initial, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.resetHours();

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [
                    ['23', '30', '00'],
                    ['23', '00', '00'],
                ],
                [
                    ['03', '30', '50'],
                    ['03', '00', '50'],
                ],
                [
                    ['50', '11', '43'],
                    ['02', '00', '43'],
                ],
                [
                    ['06', '00', '00'],
                    ['06', '00', '00'],
                ],
                [
                    ['13', '10', '00'],
                    ['13', '00', '00'],
                ],
                [
                    ['00', '30', '00'],
                    ['00', '00', '00'],
                ],
                [
                    ['01', '01', '01'],
                    ['01', '00', '01'],
                ],
            ])(
                'resetMinutes method created with %s time, returns time: %s',
                (initial, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.resetMinutes();

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [
                    ['23', '30', '50'],
                    ['23', '30', '00'],
                ],
                [
                    ['03', '30', '80'],
                    ['03', '31', '00'],
                ],
                [
                    ['50', '11', '43'],
                    ['02', '11', '00'],
                ],
                [
                    ['06', '02', '39'],
                    ['06', '02', '00'],
                ],
                [
                    ['13', '10', '00'],
                    ['13', '10', '00'],
                ],
                [
                    ['01', '30', '60'],
                    ['01', '30', '00'],
                ],
                [
                    ['01', '01', '01'],
                    ['01', '01', '00'],
                ],
            ])(
                'resetSeconds method created with %s time, returns time: %s',
                (initial, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.resetSeconds();

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [
                    ['23', '30', '50'],
                    ['00', '00', '00'],
                ],
                [
                    ['00', '00', '00'],
                    ['00', '00', '00'],
                ],
                [
                    ['03', '30', '80'],
                    ['00', '00', '00'],
                ],
                [
                    ['50', '11', '43'],
                    ['00', '00', '00'],
                ],
                [
                    ['06', '02', '39'],
                    ['00', '00', '00'],
                ],
                [
                    ['13', '10', '00'],
                    ['00', '00', '00'],
                ],
                [
                    ['01', '30', '60'],
                    ['00', '00', '00'],
                ],
                [
                    ['01', '01', '01'],
                    ['00', '00', '00'],
                ],
            ])(
                'reset method created with %s time, returns time: %s',
                (initial, res) => {
                    const time1 = new Time({
                        seconds: +initial[2],
                        minutes: +initial[1],
                        hours: +initial[0],
                    });
                    time1.reset();

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );
        });
    });

    describe('invalid cases', () => {
        describe('creation invalid tests', () => {
            test.each([
                [-9],
                [-5],
                [-300],
                [-200],
                [-29],
                [-61],
                [-1],
                [-10],
                [-90],
            ])('creation of time with invalid number of hours', (num) => {
                expect(() => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: num,
                    });
                }).toThrow(Error("Time element can't be negative"));
            });

            test.each([
                [-9],
                [-5],
                [-300],
                [-200],
                [-29],
                [-61],
                [-1],
                [-10],
                [-90],
            ])('creation of time with invalid number of minutes', (num) => {
                expect(() => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: num,
                        hours: 0,
                    });
                }).toThrow(Error("Time element can't be negative"));
            });

            test.each([
                [-9],
                [-5],
                [-300],
                [-200],
                [-29],
                [-61],
                [-1],
                [-10],
                [-90],
            ])('creation of time with invalid number of seconds', (num) => {
                expect(() => {
                    const time1 = new Time({
                        seconds: num,
                        minutes: 0,
                        hours: 0,
                    });
                }).toThrow(Error("Time element can't be negative"));
            });

            describe('set methods invalid tests', () => {
                test.each([
                    [-9],
                    [-5],
                    [-300],
                    [-200],
                    [-29],
                    [-61],
                    [-1],
                    [-10],
                    [-90],
                ])(
                    'set hours method accepts invalid number: %s and returns error',
                    (num) => {
                        const time1 = new Time({
                            seconds: 0,
                            minutes: 0,
                            hours: 0,
                        });

                        expect(() => {
                            time1.hours = num;
                        }).toThrow(Error("Time element can't be negative"));
                    }
                );

                test.each([
                    [-9],
                    [-5],
                    [-300],
                    [-200],
                    [-29],
                    [-61],
                    [-1],
                    [-10],
                    [-90],
                ])(
                    'set minutes method accepts invalid number: %s and returns error',
                    (num) => {
                        const time1 = new Time({
                            seconds: 0,
                            minutes: 0,
                            hours: 0,
                        });

                        expect(() => {
                            time1.minutes = num;
                        }).toThrow(Error("Time element can't be negative"));
                    }
                );

                test.each([
                    [-9],
                    [-5],
                    [-300],
                    [-200],
                    [-29],
                    [-61],
                    [-1],
                    [-10],
                    [-90],
                ])(
                    'set seconds method accepts invalid number: %s and returns error',
                    (num) => {
                        const time1 = new Time({
                            seconds: 0,
                            minutes: 0,
                            hours: 0,
                        });

                        expect(() => {
                            time1.seconds = num;
                        }).toThrow(Error("Time element can't be negative"));
                    }
                );
            });

            describe('add/sub methods invalid tests', () => {
                test.each([
                    [['01', '30', '30'], []],
                    [['02', '30', '30'], 6],
                    [['10', '01', '20'], 'hello'],
                    [['00', '00', '00'], '908'],
                    [['01', '30', '30'], '[00, 00, 00]'],
                    [['00', '00', '00'], { a: 8, b: 5 }],
                    [['14', '05', '10'], null],
                    [['14', '05', '10'], undefined],
                ])(
                    'addTime method accepts param: %s and add it to time: %s, than return error',
                    (arr1, param) => {
                        const time1 = new Time({
                            seconds: +arr1[2],
                            minutes: +arr1[1],
                            hours: +arr1[0],
                        });

                        expect(() => {
                            time1.addTime(param);
                        }).toThrow(Error('Invalid time input'));
                    }
                );

                test.each([
                    [['01', '30', '30'], []],
                    [['02', '30', '30'], 6],
                    [['10', '01', '20'], 'hello'],
                    [['00', '00', '00'], '908'],
                    [['01', '30', '30'], '[00, 00, 00]'],
                    [['00', '00', '00'], { a: 8, b: 5 }],
                    [['14', '05', '10'], null],
                    [['14', '05', '10'], undefined],
                ])(
                    'subTime method accepts param: %s and sub it from time: %s, than return error',
                    (arr1, param) => {
                        const time1 = new Time({
                            seconds: +arr1[2],
                            minutes: +arr1[1],
                            hours: +arr1[0],
                        });

                        expect(() => {
                            time1.subTime(param);
                        }).toThrow(Error('Invalid time input'));
                    }
                );
            });
        });
    });
});
