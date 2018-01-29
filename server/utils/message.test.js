
var expect = require('expect');
var { generateMessage } = require('./message');

describe('Generate Message', () => {

    it('should create a correct message object', () => {
        var obj = generateMessage('irene', 'ciao belli');
        expect(obj.text).toBe('ciao belli');
        expect(obj.from).toBe('irene');
        expect(obj.createdAt).toBeA("number");
    });

});