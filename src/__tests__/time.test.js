const { Time } = require('../time');

describe('Time class tests', () => {
    test.each([
        [20, ['20', '00', '00']],
        [30, ['30', '00', '00']],
        [10, ['10', '00', '00']],
        [5, ['05', '00', '00']],
    ])(
        'set hours method accepts number:%s and returns time: %s',
        (num, res) => {
            const time1 = new Time({ seconds: 0, minutes: 0, hours: 0 });
            time1.hours = num;

            const arr = time1.toString().split(':');
            expect(arr).toEqual(res);
        }
    );
});
