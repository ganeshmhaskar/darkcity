const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

// Define the allowed IP address
const allowedIP = "34.100.208.131";

// Middleware function to restrict access based on IP address
const restrictIP = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    if (clientIP !== allowedIP) {
        return res.status(403).send("Access Forbidden");
    }
    next();
};

app.use(cors());
app.use(restrictIP); // Apply IP restriction middleware

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/api/localize/*", (req, res) => {
    res.sendFile(path.join(publicPath, `./api/localize/${req.params[0]}.json`));
});

const port = 22005;
app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
