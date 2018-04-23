const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'a';
        const text = 'b';
        const message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('string');
    });


    it('should generate the correct location message object', () => {
        const from = 'a';
        const la = 1;
        const lo = 2;
        const message = generateLocationMessage(from, la, lo);
        expect(message.from).toBe(from);
        expect(message.url.includes(la)).toBeTruthy();
        expect(message.url.includes(lo)).toBeTruthy();
    });
});