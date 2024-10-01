const express = require('express');

const { handleGetAllAnalytics, handleGetAnalytics } = require('../controllers/url')

const analyticsRouter = express.Router();

analyticsRouter.get("/", handleGetAllAnalytics);

analyticsRouter.get("/:id", handleGetAnalytics);

module.exports = analyticsRouter;