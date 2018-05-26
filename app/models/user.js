const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
});

userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, 8);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.pre('save', function (next) {
  if (this.isModified('local.password')) {
    const { password } = this.local;
    const hashedPassword = this.hashPassword(password);
    this.local.password = hashedPassword;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);