const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../models/userSettingModels.js");

// GET /api/settings
const getAllSettings = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error reading user settings",
            error: error.message
        });
    }
};

// Validation
const validateUser = (data) => {
    if (!data.userId) {
        return "userId is required";
    }
    if (typeof data.userId !== "string") {
        return "userId must be a string";
    }
    if (!data.language) {
        return "language is required";
    }
    if (!["EN", "UR"].includes(data.language)) {
        return "language must be EN or UR";
    }
    if (typeof data.notificationsEnabled !== "boolean") {
        return "notificationsEnabled must be a boolean";
    }
    if (!data.timezone) {
        return "timezone is required";
    }
    if (typeof data.timezone !== "string") {
        return "timezone must be a string";
    }
    return null;
};
// GET /api/settings/:userId
const getSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User settings not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error reading user settings",
            error: error.message
        });
    }
};

// POST /api/settings
const addSettings = async (req, res) => {

    try {
        const validationError = validateUser(req.body);
        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }
        const existingUser = await getUserById(
            req.body.userId
        );
        
        if (existingUser) {
            return res.status(409).json({
                message: "userId already exists"
            });
        }
        const currentDate = new Date().toISOString();
        const newUser = {
            userId: req.body.userId,
            language: req.body.language,
            notificationsEnabled:
            req.body.notificationsEnabled,
            timezone: req.body.timezone,
            createdAt: currentDate,
            updatedAt: currentDate
        };
        const user = await createUser(newUser);
        console.log(
            `User ${user.userId} created`
        );
        res.status(201).json({
            message: "User settings created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user settings",
            error: error.message
        });

    }
};

// PUT /api/settings/:userId
const updateSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const existingUser = await getUserById(userId);
        if (!existingUser) {
            return res.status(404).json({
                message: "User settings not found"
            });
        }

        const updatedUser = {
            userId: existingUser.userId,
            language: req.body.language,
            notificationsEnabled: req.body.notificationsEnabled,
            timezone: req.body.timezone,
            createdAt: existingUser.createdAt,
            updatedAt: new Date().toISOString()
        };

        const user = await updateUser(
            userId,
            updatedUser
        );

        console.log(`User ${userId} updated`);

        res.status(200).json({
            message: "User settings updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating user settings",
            error: error.message
        });
    }
};

// DELETE /api/settings/:userId
const removeSettings = async (req, res) => {

    try {
        const { userId } = req.params;
        const deletedUser =
            await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User settings not found"
            });
        }
        console.log(
            `User ${userId} deleted`
        );
        res.status(200).json({
            message: "User settings deleted successfully",
            user: deletedUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting user settings",
            error: error.message
        });

    }
};
module.exports = {
    getAllSettings,
    getSettings,
    addSettings,
    updateSettings,
    removeSettings
};