const User = require('./user');
const expect = require('expect');

const email = 'bla@gmail.com';
const password = '123456';

const user = new User({
  'local.email': email,
  'local.password': '123456',
});

beforeEach(async () => {
  await User.remove();
  await user.save();
});

describe('createHash', () => {
  it('should create a hashed version of the password', () => {
    const hashedPassword = user.local.password;
    expect(password).not.toBe(hashedPassword);
    expect(typeof hashedPassword).toBe('string');
  });
  it('should validate a password correctly against a hashed one', async () => {
    const isValid = user.validatePassword(password);
    expect(isValid).toBe(true);
  });
  it('should raise error for incorrect password against a hashed one', () => {
    const isValid = user.validatePassword('12345');
    expect(isValid).toBe(false);
  });
});