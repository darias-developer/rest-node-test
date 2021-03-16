const Role = require('../models/role.model');
const User = require('../models/user.model');

const isRoleValid = async(role = '') => {

    const roleExists = await Role.findOne({ role });

    if ( !roleExists ) {
        throw new Error(`El ${roleExists} rol no es valido`);
    }
}

const isEmailExist = async( email = '' ) => {

    const emailExists = await User.findOne({ email });

    if ( emailExists ) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const isUserExistById = async( id ) => {

    const userExists = await User.findById( id );

    if ( !userExists ) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isRoleValid,
    isEmailExist,
    isUserExistById
}