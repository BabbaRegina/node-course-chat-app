
var expect = require('expect');
var { generateMessage,generateLocationMessage } = require('./message');

describe('Generate Message', () => {

    it('should create a correct message object', () => {
        var obj = generateMessage('irene', 'ciao belli');
        expect(obj.text).toBe('ciao belli');
        expect(obj.from).toBe('irene');
        expect(obj.createdAt).toBeA("number");
    });

});

describe('Generate Location Message', () => {

    it('should generate correct location object', () => {
        var lat = '45.8946367'; 
        var lng = '11.0439238';
        var obj = generateLocationMessage('Admin', lat, lng);
        expect(obj.url).toBe(`https://www.google.it/maps/?q=${lat},${lng}`);
        expect(obj).toInclude({url: `https://www.google.it/maps/?q=${lat},${lng}`});
        expect(obj.from).toBe('Admin');
        expect(obj.createdAt).toBeA("number");
    });

});