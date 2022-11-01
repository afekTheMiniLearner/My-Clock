const Time = require('../time');

describe('Time class tests', () => {
    describe('valid cases', () => {
        describe('creation tests', () => {
            test('creating time without params returns valid time', () => {
                const time1 = new Time();
                const response = time1.toString().split(':');

                expect(response.length).toBe(3);
                for (const element of response) {
                    const num = +element;
                    expect(typeof element).toBe('string');
                    expect(typeof num).toBe('number');
                    expect(num >= 0).toBeTruthy();
                }
            });

            test.each([
                [152, ['52', '00', '00']],
                [100, ['00', '00', '00']],
                [5, ['05', '00', '00']],
                [0, ['00', '00', '00']],
                [-5, ['-05', '00', '00']],
                [-100, ['00', '00', '00']],
                [-152, ['-52', '00', '00']],
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
                [1000, ['16', '40', '00']],
                [100, ['01', '40', '00']],
                [5, ['00', '05', '00']],
                [0, ['00', '00', '00']],
                [-5, ['-00', '05', '00']],
                [-100, ['-01', '40', '00']],
                [-1000, ['-16', '40', '00']],
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
                [5400, ['01', '30', '00']],
                [40, ['00', '00', '40']],
                [5, ['00', '00', '05']],
                [0, ['00', '00', '00']],
                [-5, ['-00', '00', '05']],
                [-40, ['-00', '00', '40']],
                [-5400, ['-01', '30', '00']],
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
                [40, 40],
                [1, 1],
                [0, 0],
                [-1, -1],
                [-40, -40],
            ])(
                'get hours method for the time created with: %s hours, returns number: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: 0,
                        hours: num,
                    });

                    expect(time1.hours).toBe(res);
                }
            );

            test.each([
                [20, 20],
                [5, 5],
                [0, 0],
                [-5, -5],
                [-20, -20],
            ])(
                'get minutes method for the time created with: %s minutes, returns number: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: 0,
                        minutes: num,
                        hours: 0,
                    });

                    expect(time1.minutes).toBe(res);
                }
            );

            test.each([
                [55, 55],
                [5, 5],
                [0, 0],
                [-5, -5],
                [-55, -55],
            ])(
                'get seconds method for the time created with: %s seconds, returns number: %s',
                (num, res) => {
                    const time1 = new Time({
                        seconds: num,
                        minutes: 0,
                        hours: 0,
                    });

                    expect(time1.seconds).toBe(res);
                }
            );

            test.each([
                [3, 30, 12600],
                [0, 15, 900],
                [0, 0, 0],
                [0, -15, -900],
                [-3, -30, -12600],
            ])(
                'get method totalSeconds for time created with: %s hours and %s minutes, returns: %s',
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
                [60, ['60', '00', '00']],
                [15, ['15', '00', '00']],
                [0, ['00', '00', '00']],
                [-15, ['-15', '00', '00']],
                [-60, ['-60', '00', '00']],
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
                [30, ['00', '30', '00']],
                [2, ['00', '02', '00']],
                [0, ['00', '00', '00']],
                [-2, ['-00', '02', '00']],
                [-30, ['-00', '30', '00']],
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
                [30, ['00', '00', '30']],
                [10, ['00', '00', '10']],
                [0, ['00', '00', '00']],
                [-10, ['-00', '00', '10']],
                [-30, ['-00', '00', '30']],
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
                [['05', '05', '05'], 10, ['15', '05', '05']],
                [['-10', '00', '00'], 5, ['-05', '00', '00']],
                [['10', '10', '10'], 0, ['10', '10', '10']],
                /* ask hadriel if i should add
                here option to add by negative number */
            ])(
                'addHours method for time: %s, accepts number:%s and returns time: %s',
                (timeParams, num, res) => {
                    const time1 = new Time({
                        seconds: +timeParams[2],
                        minutes: +timeParams[1],
                        hours: +timeParams[0],
                    });
                    time1.addHours(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [['01', '00', '30'], 50, ['01', '50', '30']],
                [['00', '-15', '00'], 5, ['-00', '10', '00']],
                [['00', '10', '00'], 0, ['00', '10', '00']],
                /* ask hadriel if i should add
                here option to add by negative number */
            ])(
                'addMinutes method for time: %s, accepts number:%s and returns time: %s',
                (timeParams, num, res) => {
                    const time1 = new Time({
                        seconds: +timeParams[2],
                        minutes: +timeParams[1],
                        hours: +timeParams[0],
                    });
                    time1.addMinutes(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [['02', '05', '00'], 20, ['02', '05', '20']],
                [['-15', '00', '-30'], 30, ['-15', '00', '00']],
                [['10', '00', '10'], 0, ['10', '00', '10']],
                /* ask hadriel if i should add
                here option to add by negative number */
            ])(
                'addSeconds method for time: %s, accepts number: %s and returns time: %s',
                (timeParams, num, res) => {
                    const time1 = new Time({
                        seconds: +timeParams[2],
                        minutes: +timeParams[1],
                        hours: +timeParams[0],
                    });

                    time1.addSeconds(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                [['27', '00', '00'], 2, ['25', '00', '00']],
                [['3', '30', '50'], 5, ['00', '00', '00']],
                [['50', '00', '00'], 0, ['50', '00', '00']],
                [['15', '00', '00'], 10, ['05', '00', '00']],
                [['13', '00', '00'], 6, ['07', '00', '00']],
                [['00', '30', '00'], 1, ['00', '00', '00']],
                /* ask hadriel if i should add
                here option to add by negative number */
            ])(
                'subHours method created with %s time, accepts number:%s and returns time: %s',
                (timeParams, num, res) => {
                    const time1 = new Time({
                        seconds: +timeParams[2],
                        minutes: +timeParams[1],
                        hours: +timeParams[0],
                    });
                    time1.subHours(num);

                    const arr = time1.toString().split(':');
                    expect(arr).toEqual(res);
                }
            );

            test.each([
                //add negatives
                [['02', '00', '00'], 30, ['01', '30', '00']],
                [['03', '30', '50'], 30, ['03', '00', '50']],
                [['04', '00', '00'], 0, ['04', '00', '00']],
                [['15', '60', '00'], 70, ['14', '50', '00']],
                [['1', '30', '57'], 1000, ['00', '00', '00']],
                [['00', '05', '120'], 6, ['00', '01', '00']],
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
                //add negatives
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
                //add negatives
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
                    ['33', '24', '40'],
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
                //add negatives
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
                    ['00', '00', '00'],
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
                    ['00', '00', '00'],
                    ['19', '05', '25'],
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

            describe('reset methods tests', () => {
                test.each([
                    //add negatives
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
                    //add negatives
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
                        ['50', '00', '43'],
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
                    //add negatives
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
                        ['50', '11', '00'],
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
                        ['01', '30', '50'],
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
                    //add negatives
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

        describe('toString method tests', () => {
            test.each([
                //add negatives
                ['HH:MM:SS', '10:15:30'],
                ['HHhours:MMminutes:SSseconds', '10hours:15minutes:30seconds'],
                ['HHh:MMm:SSs', '10h:15m:30s'],
                ['HHhrs:MMmin:SSsec', '10hrs:15min:30sec'],
                ['HHhrs', '10hrs'],
                ['MMmins', '15mins'],
                ['SSseconds', '30seconds'],
                [undefined, '10:15:30'],
            ])(
                'The format option provided is: %s expected output: %s',
                (format, res) => {
                    const time1 = new Time({
                        seconds: 30,
                        minutes: 15,
                        hours: 10,
                    });

                    expect(time1.toString(format)).toBe(res);
                }
            );
        });

        describe('invalid cases', () => {
            describe('creation invalid tests', () => {
                test.each([
                    // add invalid- remove negative
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
                    }).toThrow(
                        Error('Time element must be a valid positive number')
                    );
                });

                test.each([
                    // add invalid- remove negative
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
                    }).toThrow(
                        Error('Time element must be a valid positive number')
                    );
                });

                test.each([
                    // add invalid- remove negative
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
                    }).toThrow(
                        Error('Time element must be a valid positive number')
                    );
                });
            });

            describe('set methods invalid tests', () => {
                test.each([
                    // add invalid- remove negative
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
                        }).toThrow(
                            Error(
                                'Time element must be a valid positive number'
                            )
                        );
                    }
                );

                test.each([
                    // add invalid- remove negative
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
                        }).toThrow(
                            Error(
                                'Time element must be a valid positive number'
                            )
                        );
                    }
                );

                test.each([
                    // add invalid- remove negative
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
                        }).toThrow(
                            Error(
                                'Time element must be a valid positive number'
                            )
                        );
                    }
                );
            });

            describe('add/sub methods invalid tests', () => {
                test.each([
                    // add invalid- remove negative
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
                    // add invalid- remove negative
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

            describe('toString method invalid tests', () => {
                test.each([
                    // add invalid - remove negative
                    [10],
                    [-1],
                    [[1, 23, 4, 'a']],
                    [{ hours: 1, minutes: 9 }],
                    [['array']],
                ])('The format option provided: %s is invalid', (format) => {
                    const time1 = new Time({
                        seconds: 10,
                        minutes: 10,
                        hours: 10,
                    });

                    expect(() => {
                        time1.toString(format);
                    }).toThrow(
                        Error(
                            'Format options must contain one of the following: HH/MM/SS'
                        )
                    );
                });
            });
        });
    });
});
