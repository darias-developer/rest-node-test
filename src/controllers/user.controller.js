const {request, response} = require('express');

const {getUsers,
  createUser,
  updateUser} = require('../services/user.service');

const {createPassword} = require('../helpers/hash.helper');

const users = async (req = request, res = response) => {
  // obtiene los parametros desde la url
  const {limit = 10, offset = 0} = req.query;

  // obtiene lista paginada
  const [total, usuarios] = await getUsers(limit, offset);

  res.json({
    responseCode: 'OK',
    description: null,
    result: {
      count: usuarios.length,
      total,
      usuarios,
    },
  });
};

const userEdit = async (req = request, res = response) => {
  try {
    // obtiene campos desdes la url del request
    const {id} = req.params;
    // obtiene campos desdes el body del request
    const {name, email, role, newPassword, status} = req.body;

    const data = {name};

    if (req.userAuth.email != email) {
      data.email = email;
    }

    /**
     * en caso de que usuario sea ADMIN_ROLE puede actualizar
     * los campos password, role y status
     */
    if (req.userAuth.role == 'ADMIN_ROLE') {
      if (newPassword) {
        // aplica hash a contraseña
        data.password = await createPassword(newPassword);
      }

      if (role) {
        data.role = role;
      }

      if (status == 'BLOQUEADO') {
        data.status = false;
      } else {
        data.status = true;
      }
    }

    // actualiza la data del usuario
    updateUser(id, data);

    res.json({
      responseCode: 'OK',
      description: 'usuario actualizado con exito',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      responseCode: 'ERROR',
      description: 'Ha ocurrido un error al actualizar el usuario',
    });
  }
};

const addUser = async (req = request, res = response) => {
  try {
    // obtiene campos desdes el body del request
    const {name, email, password, role} = req.body;

    const data = {name, email, role};

    // aplica hash a contraseña
    data.password = await createPassword(password);

    // crea un nuevo usuario
    await createUser(data);

    res.json({
      responseCode: 'OK',
      description: 'usuario creado con exito',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      responseCode: 'ERROR',
      description: 'Ha ocurrido un error al crear el usuario',
    });
  }
};

module.exports = {
  users,
  userEdit,
  addUser,
};
