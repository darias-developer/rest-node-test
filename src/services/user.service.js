const User = require('../models/user.model');

const getUsers = async (limit, offset) => {
  // filtra la query por campos
  const query = {status: true};
  // consulta 2 querys y devuelve el resultado cuendo las 2 querys terminen
  return [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find( query )
        .select({'_id': 1, 'name': 2, 'email': 3, 'role': 4})
        .limit( Number( limit ) )
        .skip( Number( offset ) ),
  ]);
};

const getUserByEmail = async (email) => {
  // busca un usuario por email
  return await User.findOne({email});
};

const getUserByUid = async (uid) => {
  // busca un usuario por uid
  return await User.findById(uid);
};

const updateUser = async (id, userData) => {
  // actualiza un usuario por su id
  await User.findByIdAndUpdate(id, userData);
};

const createUser = async (userData) => {
  // crea un nuevo usuario
  const user = new User(userData);

  // guardar en db
  await user.save();
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserByUid,
  createUser,
  updateUser,
};
