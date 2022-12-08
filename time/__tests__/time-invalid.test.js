const Time = require('../time');

describe('invalid cases', () => {
    let time;
    beforeAll(() => {
        time = new Time({ seconds: 20, minutes: 15, hours: 10 });
    });

    test.each([
        [{ seconds: 'bob', minutes: 'bob', hours: 'bob' }],
        [{ seconds: '', minutes: 15, hours: 15 }],
        [{ seconds: 15, minutes: '', hours: 15 }],
        [{ seconds: 15, minutes: 15, hours: '' }],
        [{ seconds: 10, minutes: [20], hours: [30] }],
        [{ seconds: 0, minutes: { a: 1 }, hours: { a: 2 } }],
    ])('creation of time with invalid params', (params) => {
        expect(() => {
            new Time(params);
        }).toThrow(Error('Time element must be a valid number'));
    });

    test.each([
        [undefined],
        ['abc'],
        [() => {}],
        ['10'],
        [[]],
        [[5]],
        [{}],
        [{ 5: 5 }],
        [null],
    ])('set hours method with invalid param returns error', (param) => {
        expect(() => {
            time.hours = param;
        }).toThrow(Error('Time element must be a valid number'));
    });

    test.each([
        ['abc'],
        [() => {}],
        ['10'],
        [[]],
        [[5]],
        [{}],
        [{ 5: 5 }],
        [null],
        [undefined],
    ])('set minutes method with invalid param returns error', (param) => {
        expect(() => {
            time.minutes = param;
        }).toThrow(Error('Time element must be a valid number'));
    });

    test.each([
        ['abc'],
        [() => {}],
        ['10'],
        [[]],
        [[5]],
        [{}],
        [{ 5: 5 }],
        [null],
        [undefined],
    ])('set seconds method with invalid param returns error', (param) => {
        expect(() => {
            time.seconds = param;
        }).toThrow(Error('Time element must be a valid number'));
    });
});
