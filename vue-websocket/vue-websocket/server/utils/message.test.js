const expect = require("expect");
const { generateMessage } = require("./message");

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'John';
        const text = "Hello from test";
        const message = generateMessage(from, text);
        expect(typeof message.createAt).toBe('number');
        expect(message).toMatchObject({
            from,
            text
        });
    });
});