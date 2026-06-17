const Service = require("../models/serviceModel");

exports.createService = async (req, res) => {

    try {

        const { vehicle_number, service_type, date, status } = req.body;

        if (!vehicle_number || !service_type || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const id = await Service.addServiceRecord(
            req.user.id, vehicle_number, 
            service_type, date, status || "Pending"
        );

        return res.status(201).json({ message: "Service booked successfully", id });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error creating service! " + error.message });
    }

};

exports.fetchAllServices = async (req, res) => {

    try {

        const services = await Service.fetchAllServiceByUser(req.user.id);

        return res.status(200).json({services});

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error fetching services!" });
    }

};

exports.updateService = async (req, res) => {

    try {

        const { id } = req.params;
        const updates = req.body;

        const updated = await Service.updateService(req.user.id, id, updates);

        if (!updated) {
            return res.status(404).json({ message: 'Service not found or not owned by user!' });
        }

        return res.status(200).json({ message: "Service updated", id });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error updating services!" });      
    }

}

exports.deleteService = async (req, res) => {

    try {

        const { id } = req.params;
        
        const deleted = await Service.deleteService(req.user.id, id);

        if (!deleted) {
            return res.status(404).json({ message: 'Service not found or not owned by user!' });      
        }

        return res.status(200).json({ message: "Service deleted", id });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error deleting services!" });            
    }

}