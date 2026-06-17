const db = require("../config/db");

const createUser = async ({ email, name, password }) => {
    return db('users').insert({ email, name, password });
}

const findUserByEmail = async ({ email }) => {
    return db('users').where({ email }).first();
}

const findUserByUsername = async ({ name }) => {
    return db('users').where({ name }).first();
}

const findUserById = async ({ id }) => {
    return db('users').where({ id }).first();
}

const deleteUserById = async ({ id }) => {
    return db('users').where({ id }).del();
}

module.exports = { 
    createUser, 
    findUserByEmail, 
    findUserById, 
    findUserByUsername, 
    deleteUserById 
};