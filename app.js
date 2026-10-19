const express = require("express");
const cors = require("cors");

const userSettingsRoutes =
    require("./routes/userSettingRoutes");
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "User Settings API is running",
        endpoints: {
            getAllSettings: "GET /api/settings",
            getSettingById: "GET /api/settings/:userId",
            createSetting: "POST /api/settings",
            updateSetting: "PUT /api/settings/:userId",
            deleteSetting: "DELETE /api/settings/:userId"
        }
    });
});

app.use(
    "/api/settings",
    userSettingsRoutes
);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});