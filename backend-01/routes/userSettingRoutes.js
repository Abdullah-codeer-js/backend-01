const express = require("express");
const router = express.Router();
const {getAllSettings,getSettings,addSettings,updateSettings,removeSettings} = require("../controllers/userSettingControllers");

// GET all settings
router.get(
    "/",
    getAllSettings
);

// GET setting by userId
router.get(
    "/:userId",
    getSettings
);

// POST
router.post(
    "/",
    addSettings
);

// PUT
router.put(
    "/:userId",
    updateSettings
);

// DELETE
router.delete(
    "/:userId",
    removeSettings
);

module.exports = router;