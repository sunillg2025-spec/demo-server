const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmail = await User.findUserByEmail({ email });

        if (existingEmail) {
            return res.status(409).json({ message: "Email already registered!" });
        }

        const existingUsername = await User.findUserByUsername({ name });

        if (existingUsername) {
            return res.status(409).json({ message: "Username already registered!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [id] = await User.createUser({ 
            email, 
            name, 
            password: hashedPassword 
        });

        return res.status(201).json({ message: "User registered", id });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error registering user!" });
    }

}

exports.login = async (req, res) => { 

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingEmail = await User.findUserByEmail({ email });

        if (!existingEmail) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const authUser = await bcrypt.compare(password, existingEmail.password);

        if (!authUser) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const token = await jwt.sign({ 
            id: existingEmail.id, 
            email: existingEmail.email 
        }, 'abcdef', { expiresIn: '1h' });

        return res.status(200).json({ message: "Logged in", token }); 

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error logging in!" });
    }

}

exports.deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        await User.deleteUserById({ id });

        return res.status(200).json({ message: "User deleted successfully!" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error deleting user "});
    }

}