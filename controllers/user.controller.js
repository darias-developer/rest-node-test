const { request, response } = require('express');
 
const getUser = (req = request, res = response) => {

    const {test, test1} = req.query;

    res.json({
        responseCode: 'OK',
        description: 'get api',
        test,
        test1
    });
}

const putUser = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        responseCode: 'OK',
        description: 'put api',
        id
    });
}

const postUser = (req = request, res = response) => {

    const body = req.body;

    res.json({
        responseCode: 'OK',
        description: 'post api',
        body
    });
}

const deleteUser = (req = request, res = response) => {
    res.json({
        responseCode: 'OK',
        description: 'delete api'
    });
}

const patchUser = (req = request, res = response) => {
    res.json({
        responseCode: 'OK',
        description: 'patch api'
    });
}

module.exports = {
    getUser, putUser, postUser, deleteUser, patchUser
}