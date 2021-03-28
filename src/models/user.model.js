const {Schema, model} = require('mongoose');

const userSchema = new Schema({

  name: {
    type: String,
    require: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    require: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'La contrasena es obligatorio'],
  },
  role: {
    type: String,
    require: [true, 'El rol es obligatorio'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// oculta data del objecto
userSchema.methods.toJSON = function() {
  const {_id, ...user} = this.toObject();
  user.uid = _id;
  delete user._v;
  delete user._password;
  return user;
};

module.exports = model( 'User', userSchema );
