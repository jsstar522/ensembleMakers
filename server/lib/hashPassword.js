const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  });
}