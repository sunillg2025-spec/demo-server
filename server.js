require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoutes.js");
const serviceRoute = require("./routes/serviceRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use("/auth", authRoute);
app.use("/services", serviceRoute);

app.get("/", (req, res) => res.status(200).json({ message: "Vehicle API running!" }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})