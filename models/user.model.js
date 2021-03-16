const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require:  [true, 'El nombre es obligatorio']
    }, 
    email: {
        type: String,
        require:  [true, 'El correo es obligatorio'],
        unique: true
    }, 
    password: {
        type: String,
        require:  [true, 'La contrasena es obligatorio']
    }, 
    img: {
        type: String
    },
    role: {
        type: String,
        require:  [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    }, 
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: true
    }
});

//oculta data del objecto
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema );