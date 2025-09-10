require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const votersRoutes = require("./routes/votersRoutes");

const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all routes and origins
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/voters", votersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
