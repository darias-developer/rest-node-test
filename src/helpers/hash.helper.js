const bcryptjs = require('bcryptjs');

const createPassword = async (password) => {
  const salt = await bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
};

const isValidPassword = (password, passwordHash) => {
  return bcryptjs.compareSync(password, passwordHash);
};

module.exports = {
  createPassword,
  isValidPassword,
};
