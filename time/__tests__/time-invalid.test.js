const Time = require('../time');

//todo refactor those
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
            }).toThrow(Error('Time element must be a valid positive number'));
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
            }).toThrow(Error('Time element must be a valid positive number'));
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
            }).toThrow(Error('Time element must be a valid positive number'));
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
                    Error('Time element must be a valid positive number')
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
                    Error('Time element must be a valid positive number')
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
                    Error('Time element must be a valid positive number')
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
