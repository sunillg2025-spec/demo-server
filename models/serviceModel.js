const db = require("../config/db");

const addServiceRecord = async (userId, vehicle_number, service_type, date, status) => {

    const [id] = await db('services').insert({ 
        vehicle_number,
        service_type,
        date,
        status,
        user_id: userId
    });

    return id;
};

const fetchAllServiceByUser = async (userId) => {
    return db('services').where({ user_id: userId }).select("*");
}

const updateService = async (serviceId, userId, updates) => {
    return db('services').where({ id: serviceId, user_id: userId }).update(updates);
}

const deleteService = async (serviceId, userId) => {
    return db('services').where({ id: serviceId, user_id: userId}).del();
}

module.exports = { addServiceRecord, fetchAllServiceByUser, updateService, deleteService };